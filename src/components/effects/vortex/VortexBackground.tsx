/**
 * Testimonials vortex — Three.js Points spiral.
 * Ported from DesignCode/shadcn Vortex (no R3F / no theme hooks).
 * Cool violet→blue palette to bridge Hero cloud-field and Process laser.
 */
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { cn } from '../../../lib/utils';

type VortexBackgroundProps = {
  className?: string;
  /** Particle count (default 1800 — quieter than demo 2200). */
  count?: number;
  /** Rotation speed multiplier. */
  speed?: number;
  /** Spiral arm count. */
  arms?: number;
};

const CORE = new THREE.Color('#c4b5fd'); // violet-300
const RIM = new THREE.Color('#7dd3fc'); // sky-300 — cool night rim

function seedVortex(count: number, arms: number) {
  const positions = new Float32Array(count * 3);
  const radii = new Float32Array(count);
  const radius = 6;
  for (let i = 0; i < count; i++) {
    const r = Math.pow(Math.random(), 0.6) * radius;
    const arm = i % arms;
    const branch = (arm / arms) * Math.PI * 2;
    const spin = r * 0.5;
    const scatter = (Math.random() - 0.5) * (0.6 + r * 0.08);
    const angle = branch + spin;
    positions[i * 3] = Math.cos(angle) * r + scatter;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 0.6;
    positions[i * 3 + 2] = Math.sin(angle) * r + scatter;
    radii[i] = r / radius;
  }
  return { positions, radii };
}

/**
 * Full-bleed vortex particle backdrop for Testimonials.
 * pointer-events none; pauses off-screen; reduced-motion freezes a frame.
 */
export function VortexBackground({
  className,
  count = 1800,
  speed = 0.85,
  arms = 3,
}: VortexBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 3, 8);
    camera.lookAt(0, 0, 0);

    const { positions, radii } = seedVortex(count, arms);
    const colors = new Float32Array(count * 3);
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      c.copy(CORE).lerp(RIM, radii[i]);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      vertexColors: true,
      size: 0.05,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    points.rotation.set(0.5, 0, 0);
    scene.add(points);

    let raf = 0;
    let running = true;
    let inView = true;
    let last = performance.now();
    let frozen = false;

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    const draw = () => {
      renderer.render(scene, camera);
    };

    const frame = (now: number) => {
      if (!running) return;
      const visible = inView && document.visibilityState === 'visible';

      if (reduceMotion.matches) {
        if (!frozen) {
          draw();
          frozen = true;
        }
        return;
      }

      if (!visible) {
        raf = requestAnimationFrame(frame);
        last = now;
        return;
      }

      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;
      points.rotation.y += delta * 0.12 * speed;
      draw();
      raf = requestAnimationFrame(frame);
    };

    const onVisibility = () => {
      if (document.visibilityState === 'visible' && inView && !reduceMotion.matches) {
        last = performance.now();
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(frame);
      }
    };

    const onMotionChange = () => {
      frozen = false;
      cancelAnimationFrame(raf);
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    reduceMotion.addEventListener('change', onMotionChange);

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry?.isIntersecting ?? true;
        if (inView && !reduceMotion.matches) {
          last = performance.now();
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(frame);
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(canvas);

    raf = requestAnimationFrame(frame);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      running = false;
      cancelAnimationFrame(raf);
    };
    canvas.addEventListener('webglcontextlost', onContextLost);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      reduceMotion.removeEventListener('change', onMotionChange);
      observer.disconnect();
      canvas.removeEventListener('webglcontextlost', onContextLost);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [count, speed, arms]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
      aria-hidden
    />
  );
}
