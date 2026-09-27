import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { cn } from '../../../lib/utils';

type HongKongSkylineProps = {
  className?: string;
};

/** Simplified massing inspired by HK towers (IFC-ish, BoC facets, mid-rises). */
const TOWERS: { x: number; z: number; w: number; d: number; h: number }[] = [
  { x: -3.2, z: 0.4, w: 0.55, d: 0.55, h: 2.2 },
  { x: -2.4, z: -0.2, w: 0.7, d: 0.5, h: 3.4 },
  { x: -1.55, z: 0.15, w: 0.45, d: 0.45, h: 2.6 },
  { x: -0.85, z: -0.35, w: 0.85, d: 0.55, h: 4.6 }, // tall IFC-ish
  { x: 0.05, z: 0.25, w: 0.5, d: 0.7, h: 3.1 },
  { x: 0.75, z: -0.1, w: 0.65, d: 0.45, h: 3.9 }, // angular BoC-ish mass
  { x: 1.55, z: 0.35, w: 0.4, d: 0.4, h: 2.4 },
  { x: 2.2, z: -0.25, w: 0.55, d: 0.55, h: 3.0 },
  { x: 2.95, z: 0.1, w: 0.7, d: 0.5, h: 2.0 },
  { x: -0.2, z: 0.85, w: 1.1, d: 0.45, h: 0.85 }, // podium
  { x: 1.2, z: 0.9, w: 0.9, d: 0.4, h: 0.7 },
];

/**
 * Procedural low-poly HK skyline — matte metal + soft blue rim.
 * No Meshy GLB required. Pauses when off-screen / reduced motion.
 */
export function HongKongSkyline({ className }: HongKongSkylineProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0;
    let running = true;
    let inView = true;
    let t0 = performance.now();

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 40);
    camera.position.set(1.2, 3.4, 13.2);
    camera.lookAt(0.2, 1.6, 0);

    const root = new THREE.Group();
    root.rotation.y = -0.32;
    scene.add(root);

    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#2c3344'),
      metalness: 0.78,
      roughness: 0.38,
    });
    const tallMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#3a4560'),
      metalness: 0.82,
      roughness: 0.32,
      emissive: new THREE.Color('#2a4a7a'),
      emissiveIntensity: 0.28,
    });

    for (const tower of TOWERS) {
      const geo = new THREE.BoxGeometry(tower.w, tower.h, tower.d);
      const mesh = new THREE.Mesh(geo, tower.h > 3.2 ? tallMat : mat);
      mesh.position.set(tower.x, tower.h / 2, tower.z);
      root.add(mesh);

      // Thin lit crown on taller towers
      if (tower.h > 2.5) {
        const crown = new THREE.Mesh(
          new THREE.BoxGeometry(tower.w * 0.92, 0.06, tower.d * 0.92),
          new THREE.MeshStandardMaterial({
            color: '#8ab4ff',
            emissive: '#5a8fd4',
            emissiveIntensity: 0.9,
            metalness: 0.2,
            roughness: 0.4,
          }),
        );
        crown.position.set(tower.x, tower.h + 0.04, tower.z);
        root.add(crown);
      }
    }

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 3.6),
      new THREE.MeshStandardMaterial({
        color: '#12141c',
        metalness: 0.4,
        roughness: 0.75,
      }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0.01;
    root.add(ground);

    const ambient = new THREE.AmbientLight(0x8a96b8, 0.65);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xd0daff, 1.45);
    key.position.set(-5, 7, 6);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0x6a9cff, 1.1);
    rim.position.set(6, 4, -5);
    scene.add(rim);

    const fill = new THREE.PointLight(0xa88cff, 0.55, 22);
    fill.position.set(0.5, 3, 5);
    scene.add(fill);

    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (w < 1 || h < 1) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    const draw = (now: number) => {
      const t = (now - t0) * 0.001;
      if (!reduceMotion.matches) {
        root.rotation.y = -0.28 + Math.sin(t * 0.35) * 0.12;
        root.position.y = Math.sin(t * 0.55) * 0.04;
      }
      renderer.render(scene, camera);
    };

    const frame = (now: number) => {
      if (!running) return;
      const visible = inView && document.visibilityState === 'visible';
      if (visible) draw(now);
      if (!reduceMotion.matches && visible) {
        raf = requestAnimationFrame(frame);
      } else if (reduceMotion.matches) {
        draw(now);
      } else {
        raf = requestAnimationFrame(frame);
      }
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry?.isIntersecting ?? true;
        if (inView) schedule();
      },
      { threshold: 0.08 },
    );
    io.observe(host);

    const onVis = () => {
      if (document.visibilityState === 'visible' && inView) schedule();
    };
    document.addEventListener('visibilitychange', onVis);
    reduceMotion.addEventListener('change', schedule);

    schedule();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      reduceMotion.removeEventListener('change', schedule);
      root.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          const m = obj.material;
          if (Array.isArray(m)) m.forEach((x) => x.dispose());
          else m.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className={cn('pointer-events-none absolute inset-0', className)}
      aria-hidden
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
