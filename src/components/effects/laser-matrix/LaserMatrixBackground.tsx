import { useEffect, useRef } from 'react';
import { cn } from '../../../lib/utils';
import { LASER_MATRIX_FRAGMENT, LASER_MATRIX_VERTEX } from './laserMatrixShaders';

type LaserMatrixBackgroundProps = {
  className?: string;
};

function createShader(gl: WebGLRenderingContext, src: string, type: number) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/**
 * Matrix Junction laser backdrop for Process — junction on the right, cloud-blue tint.
 * pointer-events none so timeline hover stays interactive.
 */
export function LaserMatrixBackground({ className }: LaserMatrixBackgroundProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const gl = canvas.getContext('webgl', {
      antialias: false,
      alpha: false,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance',
    });
    if (!gl) return;

    const vs = createShader(gl, LASER_MATRIX_VERTEX, gl.VERTEX_SHADER);
    const fs = createShader(gl, LASER_MATRIX_FRAGMENT, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const quad = new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uMouseActive = gl.getUniformLocation(program, 'u_mouseActive');

    let mouseX = -1000;
    let mouseY = -1000;
    let lastMouseMove = 0;
    let currentMouseActive = 0;
    let raf = 0;
    let running = true;
    let inView = true;
    let frozenTime = 0;
    const startedAt = performance.now();

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (w === 0 || h === 0) return;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const onPointerMove = (e: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      const dpr = canvas.width / Math.max(1, bounds.width);
      mouseX = (e.clientX - bounds.left) * dpr;
      mouseY = (bounds.bottom - e.clientY) * dpr;
      lastMouseMove = performance.now();
    };

    const onPointerLeaveWindow = () => {
      lastMouseMove = 0;
    };

    const draw = (tSec: number) => {
      const now = performance.now();
      const timeSinceMove = lastMouseMove > 0 ? now - lastMouseMove : 9999;
      const targetActive =
        timeSinceMove < 150 ? 1 : Math.max(0, 1 - (timeSinceMove - 150) / 350);
      currentMouseActive += (targetActive - currentMouseActive) * 0.15;

      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, tSec);
      gl.uniform2f(uMouse, mouseX, mouseY);
      gl.uniform1f(uMouseActive, currentMouseActive);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const frame = (t: number) => {
      if (!running) return;
      const tSec = (t - startedAt) * 0.001;
      const visible = inView && document.visibilityState === 'visible';
      if (reduceMotion.matches) {
        if (frozenTime === 0) frozenTime = tSec;
        draw(frozenTime);
        return;
      }
      if (!visible) {
        raf = requestAnimationFrame(frame);
        return;
      }
      draw(tSec);
      raf = requestAnimationFrame(frame);
    };

    const onVisibility = () => {
      if (document.visibilityState === 'visible' && inView && !reduceMotion.matches) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(frame);
      }
    };

    const onMotionChange = () => {
      cancelAnimationFrame(raf);
      frozenTime = 0;
      raf = requestAnimationFrame(frame);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    // Window listeners so the canvas can stay pointer-events: none
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('blur', onPointerLeaveWindow);
    document.addEventListener('visibilitychange', onVisibility);
    reduceMotion.addEventListener('change', onMotionChange);

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry?.isIntersecting ?? true;
        if (inView && !reduceMotion.matches) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(frame);
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(host);

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
      resizeObserver.disconnect();
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('blur', onPointerLeaveWindow);
      document.removeEventListener('visibilitychange', onVisibility);
      reduceMotion.removeEventListener('change', onMotionChange);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className={cn('pointer-events-none absolute inset-0 overflow-hidden bg-gray-900', className)}
      aria-hidden
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
