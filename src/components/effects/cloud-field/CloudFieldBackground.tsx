import { useEffect, useRef } from 'react';
import { cn } from '../../../lib/utils';
import { CLOUD_FIELD_FRAGMENT, CLOUD_FIELD_VERTEX } from './cloudFieldShaders';

type CloudFieldBackgroundProps = {
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
 * Full-bleed cloud-field WebGL backdrop (authored strata shader, HK-night regrade).
 * pointer-events none — CTA stays clickable.
 */
export function CloudFieldBackground({ className }: CloudFieldBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      antialias: true,
      alpha: false,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance',
    });
    if (!gl) return;

    const vs = createShader(gl, CLOUD_FIELD_VERTEX, gl.VERTEX_SHADER);
    const fs = createShader(gl, CLOUD_FIELD_FRAGMENT, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const quad = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, 'u_res');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');

    let mx = 0.5;
    let my = 0.5;
    let smx = 0.5;
    let smy = 0.5;
    let raf = 0;
    let running = true;
    let inView = true;
    let frozenTime = 0;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) return;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const onMouse = (e: MouseEvent) => {
      mx = e.clientX / window.innerWidth;
      my = 1.0 - e.clientY / window.innerHeight;
    };

    const draw = (tSec: number) => {
      smx += (mx - smx) * 0.04;
      smy += (my - smy) * 0.04;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, tSec);
      gl.uniform2f(uMouse, smx, smy);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const frame = (t: number) => {
      if (!running) return;
      const tSec = t * 0.001;
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
      if (reduceMotion.matches) {
        frozenTime = 0;
        raf = requestAnimationFrame(frame);
      } else {
        raf = requestAnimationFrame(frame);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouse, { passive: true });
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
      { threshold: 0.05 }
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
      window.removeEventListener('mousemove', onMouse);
      document.removeEventListener('visibilitychange', onVisibility);
      reduceMotion.removeEventListener('change', onMotionChange);
      observer.disconnect();
      canvas.removeEventListener('webglcontextlost', onContextLost);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
      aria-hidden
    />
  );
}
