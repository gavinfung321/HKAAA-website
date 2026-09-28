import { useEffect, useRef } from 'react';
import { cn } from '../../../lib/utils';
import { BLAZE_FRAGMENT, BLAZE_VERTEX } from './blazeShaders';

export type BlazeBackgroundProps = {
  className?: string;
  height?: number;
  speed?: number;
  sparks?: number;
  sparkDensity?: number;
  sparkSize?: number;
  layers?: number;
  smoke?: number;
  glow?: number;
  /** Vertical fade start (0–1). Lower = sparks die sooner toward top. Default 0.55. */
  fadeTop?: number;
  /** Particle life height. 1 = DesignCode fire rise; lower = sparks reach mid/upper. */
  sparkFalloff?: number;
  sparkColor?: [number, number, number];
  smokeColor?: [number, number, number];
  maxDpr?: number;
};

type BlazeOptions = Required<
  Pick<
    BlazeBackgroundProps,
    | 'height'
    | 'speed'
    | 'sparks'
    | 'sparkDensity'
    | 'sparkSize'
    | 'layers'
    | 'smoke'
    | 'glow'
    | 'fadeTop'
    | 'sparkFalloff'
    | 'sparkColor'
    | 'smokeColor'
    | 'maxDpr'
  >
>;

/** DesignCode homepage Blaze defaults (courses section). */
const DEFAULTS: BlazeOptions = {
  height: 0.97,
  speed: 1,
  sparks: 0.5,
  sparkDensity: 1.5,
  sparkSize: 1,
  layers: 4,
  smoke: 0.5,
  glow: 1.5,
  fadeTop: 0.55,
  sparkFalloff: 1,
  sparkColor: [0.72, 0.42, 1],
  smokeColor: [0.52, 0.34, 0.95],
  maxDpr: 1.75,
};

function createShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Blaze shader error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/**
 * DesignCode Blaze — purple smoke + sparks. Section-scoped absolute fill.
 * Smoke-only (no DOM heat-warp pass). Pauses off-screen / reduced-motion.
 */
export function BlazeBackground({
  className,
  height = DEFAULTS.height,
  speed = DEFAULTS.speed,
  sparks = DEFAULTS.sparks,
  sparkDensity = DEFAULTS.sparkDensity,
  sparkSize = DEFAULTS.sparkSize,
  layers = DEFAULTS.layers,
  smoke = DEFAULTS.smoke,
  glow = DEFAULTS.glow,
  fadeTop = DEFAULTS.fadeTop,
  sparkFalloff = DEFAULTS.sparkFalloff,
  sparkColor = DEFAULTS.sparkColor,
  smokeColor = DEFAULTS.smokeColor,
  maxDpr = DEFAULTS.maxDpr,
}: BlazeBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const optsRef = useRef<BlazeOptions>({
    height,
    speed,
    sparks,
    sparkDensity,
    sparkSize,
    layers,
    smoke,
    glow,
    fadeTop,
    sparkFalloff,
    sparkColor,
    smokeColor,
    maxDpr,
  });

  optsRef.current = {
    height,
    speed,
    sparks,
    sparkDensity,
    sparkSize,
    layers,
    smoke,
    glow,
    fadeTop,
    sparkFalloff,
    sparkColor,
    smokeColor,
    maxDpr,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2', {
      alpha: true,
      depth: false,
      stencil: false,
      antialias: false,
      premultipliedAlpha: true,
    });
    if (!gl || gl.isContextLost()) return;

    const vs = createShader(gl, gl.VERTEX_SHADER, BLAZE_VERTEX);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, BLAZE_FRAGMENT);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    const uniforms: Record<string, WebGLUniformLocation | null> = {};
    const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < count; i++) {
      const info = gl.getActiveUniform(program, i);
      if (!info) continue;
      uniforms[info.name] = gl.getUniformLocation(program, info.name);
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0;
    let running = true;
    let inView = true;
    let animating = false;
    let timeSec = 0;
    let last = performance.now();

    const resize = () => {
      const parent = canvas.parentElement;
      const rect = parent?.getBoundingClientRect();
      const cssW = Math.max(1, rect?.width ?? canvas.clientWidth);
      const cssH = Math.max(1, rect?.height ?? canvas.clientHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, optsRef.current.maxDpr);
      const w = Math.max(1, Math.round(cssW * dpr));
      const h = Math.max(1, Math.round(cssH * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    const draw = () => {
      const o = optsRef.current;
      gl.useProgram(program);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uniforms.uResolution, canvas.width, canvas.height);
      gl.uniform1f(uniforms.uTime, timeSec);
      gl.uniform1f(uniforms.uHeight, o.height);
      gl.uniform1f(uniforms.uSparks, o.sparks);
      gl.uniform1f(uniforms.uSparkDensity, Math.max(o.sparkDensity, 0.05));
      gl.uniform1f(uniforms.uSparkSize, Math.max(o.sparkSize, 0.05));
      gl.uniform1i(uniforms.uLayers, Math.min(Math.max(Math.round(o.layers), 1), 10));
      gl.uniform1f(uniforms.uSmoke, o.smoke);
      gl.uniform1f(uniforms.uGlow, o.glow);
      gl.uniform1f(uniforms.uFadeTop, o.fadeTop);
      gl.uniform1f(uniforms.uSparkFalloff, o.sparkFalloff);
      gl.uniform3f(uniforms.uSparkColor, o.sparkColor[0], o.sparkColor[1], o.sparkColor[2]);
      gl.uniform3f(uniforms.uSmokeColor, o.smokeColor[0], o.smokeColor[1], o.smokeColor[2]);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const loop = (now: number) => {
      if (!running) return;
      if (!inView) {
        animating = false;
        return;
      }
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      if (!reduceMotion.matches) timeSec += dt * optsRef.current.speed;
      draw();
      if (reduceMotion.matches) {
        animating = false;
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (!running || animating || !inView) return;
      animating = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };

    resize();
    draw();
    start();

    const onResize = () => {
      resize();
      draw();
      start();
    };
    window.addEventListener('resize', onResize);

    const ro =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => onResize())
        : null;
    if (canvas.parentElement) ro?.observe(canvas.parentElement);

    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            ([entry]) => {
              inView = entry?.isIntersecting ?? true;
              if (inView) start();
            },
            { root: null, threshold: 0.05 }
          )
        : null;
    io?.observe(canvas);

    const onMotion = () => {
      draw();
      start();
    };
    reduceMotion.addEventListener?.('change', onMotion);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      reduceMotion.removeEventListener?.('change', onMotion);
      ro?.disconnect();
      io?.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
    // Remount when shader-facing props that HMR often leaves on a stale program change.
  }, [sparkDensity, sparkFalloff, fadeTop, layers]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full',
        className
      )}
    />
  );
}
