/**
 * Footer wireframe terrain — DesignCode-inspired engraved landscape.
 * Terrain-first: rolling contours + sparse low props. No building farm.
 * Pointer parallax kept (viewport −1…1 → damped cam).
 */
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { cn } from '../../../lib/utils';

type WireframeLandscapeBackgroundProps = {
  className?: string;
  speed?: number;
};

const LINE = new THREE.Color('#b8c0ce');
const LINE_DIM = new THREE.Color('#6a7588');

function hash2(x: number, z: number): number {
  const n = Math.sin(x * 127.1 + z * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

function valueNoise(x: number, z: number): number {
  const ix = Math.floor(x);
  const iz = Math.floor(z);
  const fx = x - ix;
  const fz = z - iz;
  const ux = fx * fx * (3 - 2 * fx);
  const uz = fz * fz * (3 - 2 * fz);
  const a = hash2(ix, iz);
  const b = hash2(ix + 1, iz);
  const c = hash2(ix, iz + 1);
  const d = hash2(ix + 1, iz + 1);
  return a + (b - a) * ux + (c - a) * uz + (a - b - c + d) * ux * uz;
}

function fbm(x: number, z: number): number {
  let v = 0;
  let a = 1;
  let f = 1;
  let s = 0;
  for (let i = 0; i < 5; i++) {
    const n = 1 - Math.abs(valueNoise(x * f, z * f) * 2 - 1);
    v += Math.pow(n, 1.25) * a;
    s += a;
    a *= 0.52;
    f *= 2.03;
  }
  return v / s;
}

/** Soft ridges + mid peaks — closer to DesignCode engraved terrain than a city grid. */
function terrainHeight(x: number, z: number): number {
  const peaks: [number, number, number, number, number][] = [
    [1.2, -1.8, 2.4, 1.9, 1.15],
    [-2.4, -2.6, 2.1, 1.7, 0.95],
    [4.2, -3.4, 2.0, 1.8, 0.85],
    [-4.8, -3.8, 2.2, 1.9, 0.8],
    [0.2, -5.2, 2.8, 2.2, 0.7],
    [6.5, -5.0, 2.4, 2.0, 0.65],
    [-6.8, -5.4, 2.5, 2.1, 0.6],
    [2.8, -7.0, 2.6, 2.3, 0.55],
    [-3.2, -7.4, 2.7, 2.4, 0.5],
  ];

  let bump = 0;
  for (const [cx, cz, rx, rz, h] of peaks) {
    const u = (x - cx) / rx;
    const v = (z - cz) / rz;
    const m = u * u + v * v;
    if (m < 1) bump += h * Math.pow(1 - m, 1.35);
  }

  const n = fbm(x * 0.28 + 2.1, z * 0.22 + 0.7);
  const ridge = Math.pow(n, 1.45);
  const front = THREE.MathUtils.smoothstep(2.5, -1.5, z);
  const mid = THREE.MathUtils.smoothstep(1.5, -8.5, z);

  let y =
    bump * (0.4 + 0.9 * ridge) * mid +
    ridge * ridge * 0.55 * front +
    n * 0.22 * mid;

  // Fine grain toward camera (harbor / flats)
  const near = THREE.MathUtils.smoothstep(-1.5, 3.5, z);
  if (near > 0.001) {
    const g1 = valueNoise(x * 2.2 + 4, z * 1.6);
    const g2 = valueNoise(x * 5.5, z * 4.2 + 2);
    y += (g1 * g1 * 0.08 + g2 * g2 * 0.035) * near;
  }

  // Soft oval falloff — not a hard square plate
  const edge = Math.hypot(x / 14, z / 11);
  const bowl = 1 - THREE.MathUtils.smoothstep(0.72, 1.12, edge);
  return y * bowl - Math.max(0, edge - 0.65) * 0.55;
}

function colorize(geo: THREE.BufferGeometry, maxH: number) {
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const c = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const t = THREE.MathUtils.clamp((pos.getY(i) + 0.2) / maxH, 0, 1);
    c.copy(LINE_DIM).lerp(LINE, 0.15 + t * 0.85);
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
}

function mergeParts(parts: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const total = parts.reduce((n, g) => n + g.attributes.position.count, 0);
  const positions = new Float32Array(total * 3);
  const colors = new Float32Array(total * 3);
  let offset = 0;
  for (const g of parts) {
    positions.set(g.attributes.position.array as Float32Array, offset);
    colors.set(g.attributes.color.array as Float32Array, offset);
    offset += (g.attributes.position.array as Float32Array).length;
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  out.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return out;
}

/** Sparse DesignCode-style cones / needles on the near field. */
function addSparseProps(parts: THREE.BufferGeometry[], disposables: THREE.BufferGeometry[], maxH: number) {
  let seed = 42;
  const next = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  for (let i = 0; i < 28; i++) {
    const x = (next() - 0.5) * 16;
    const z = -1.2 + next() * 4.5;
    const h = 0.18 + next() * 0.32;
    const r = 0.04 + next() * 0.05;
    const base = terrainHeight(x, z);
    const cone = new THREE.ConeGeometry(r, h, 5, 1, true);
    cone.translate(x, base + h * 0.5, z);
    const edges = new THREE.EdgesGeometry(cone);
    cone.dispose();
    colorize(edges, maxH);
    parts.push(edges);
    disposables.push(edges);
  }
}

/**
 * Full-bleed wireframe terrain for Footer (terrain-first).
 */
export function WireframeLandscapeBackground({
  className,
  speed = 1,
}: WireframeLandscapeBackgroundProps) {
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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.04);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 80);
    camera.position.set(0, 4.4, 11.8);
    camera.lookAt(0, 0.55, -1.5);

    const disposables: THREE.BufferGeometry[] = [];
    const parts: THREE.BufferGeometry[] = [];

    const ground = new THREE.PlaneGeometry(30, 22, 110, 80);
    ground.rotateX(-Math.PI / 2);
    const pos = ground.attributes.position;
    let maxH = 0.5;
    for (let i = 0; i < pos.count; i++) {
      const y = terrainHeight(pos.getX(i), pos.getZ(i));
      pos.setY(i, y);
      maxH = Math.max(maxH, y);
    }
    pos.needsUpdate = true;

    const groundWire = new THREE.WireframeGeometry(ground);
    ground.dispose();
    colorize(groundWire, maxH);
    parts.push(groundWire);
    disposables.push(groundWire);

    addSparseProps(parts, disposables, maxH);

    const geo = mergeParts(parts);
    disposables.push(geo);

    const material = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.44,
      depthWrite: false,
    });

    const lines = new THREE.LineSegments(geo, material);
    lines.position.y = -0.35;
    scene.add(lines);

    let raf = 0;
    let running = true;
    let inView = true;
    let last = performance.now();
    let frozen = false;
    let t = 0;
    let idleMix = 1;
    let idleResetAt = 0;

    let pointerTX = 0;
    let pointerTY = 0;
    let camX = 0;
    let camY = 0;
    const BASE_Y = 4.4;
    const BASE_Z = 11.8;
    const LOOK_Y = 0.55;
    const LOOK_Z = -1.5;

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!inView || reduceMotion.matches) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      pointerTX = -nx * 0.85;
      pointerTY = ny * 0.32;
      idleMix = 0;
      idleResetAt = performance.now();
    };

    const draw = () => {
      const sway = Math.sin(t * 0.22) * 0.26 * idleMix;
      const bob = Math.cos(t * 0.18) * 0.09 * idleMix;
      camera.position.set(camX + sway, BASE_Y + camY + bob, BASE_Z);
      camera.lookAt(camX * 0.3 + sway * 0.18, LOOK_Y + camY * 0.35, LOOK_Z);
      renderer.render(scene, camera);
    };

    const frame = (now: number) => {
      if (!running) return;
      const visible = inView && document.visibilityState === 'visible';

      if (reduceMotion.matches) {
        if (!frozen) {
          t = 0;
          camX = 0;
          camY = 0;
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
      t += delta * speed;

      const follow = 1 - Math.pow(0.945, delta * 60);
      camX += (pointerTX - camX) * follow;
      camY += (pointerTY - camY) * follow;

      if (now - idleResetAt > 6000) {
        idleMix += (1 - idleMix) * Math.min(1, delta * 0.35);
      }

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
    window.addEventListener('pointermove', onPointerMove, { passive: true });
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
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibility);
      reduceMotion.removeEventListener('change', onMotionChange);
      observer.disconnect();
      canvas.removeEventListener('webglcontextlost', onContextLost);
      for (const g of disposables) g.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [speed]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
      aria-hidden
    />
  );
}
