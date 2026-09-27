export const LASER_MATRIX_VERTEX = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

/**
 * Matrix Junction laser (from DesignCode matrix-field).
 * Center pinned to the RIGHT so left-aligned Process copy stays clear.
 * Tint matched to hero cloud-field blues (cool night sky).
 */
export const LASER_MATRIX_FRAGMENT = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_mouseActive;

float hash(float n) { return fract(sin(n) * 753.5453123); }
float noise(float x) {
  float i = floor(x);
  float f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(hash(i), hash(i + 1.0), f);
}

vec2 sdLine(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a, ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return vec2(length(pa - ba * h), h);
}

float lightning(vec2 uv, vec2 a, vec2 b, float t) {
  vec2 ab = b - a;
  float len = length(ab);
  if (len < 0.01) return 0.0;
  vec2 dir = ab / len;

  vec2 pa = uv - a;
  float h = clamp(dot(pa, dir) / len, 0.0, 1.0);
  float dist = length(pa - dir * (h * len));

  float env = sin(h * 3.1415);

  float offset = (noise(h * 25.0 - t * 35.0) - 0.5) * 0.08 * env;
  offset += (noise(h * 70.0 + t * 50.0) - 0.5) * 0.02 * env;

  float d = abs(dist + offset);

  return (0.0002 / (d + 0.0002) + 0.00001 / (d * d + 0.00001)) * env;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv = uv * 2.0 - 1.0;
  uv.x *= u_resolution.x / u_resolution.y;

  vec2 mouseUV = u_mouse / u_resolution.xy;
  mouseUV = mouseUV * 2.0 - 1.0;
  mouseUV.x *= u_resolution.x / u_resolution.y;

  // Focal junction — right side (mirror of original left-biased matrix field)
  vec2 center = vec2(0.78, -0.12);
  center.x += sin(u_time * 0.4) * 0.03;
  center.y += cos(u_time * 0.3) * 0.03;

  vec2 dirUp = normalize(vec2(-0.15, 1.0));
  vec2 dirLeft = normalize(vec2(-1.0, -0.22));
  vec2 dirDownRight = normalize(vec2(0.75, -0.65));

  vec2 l1 = sdLine(uv, center, center + dirUp * 5.0);
  vec2 l2 = sdLine(uv, center, center + dirLeft * 5.0);
  vec2 l3 = sdLine(uv, center, center + dirDownRight * 5.0);

  float intensity = 0.006;
  float glow = intensity / (l1.x + 0.001) +
               intensity / (l2.x + 0.001) +
               (intensity * 0.4) / (l3.x + 0.001);

  float pulse1 = smoothstep(0.1, 0.0, abs(l1.y - fract(u_time * 0.4))) * 0.03 / (l1.x + 0.001);
  float pulse2 = smoothstep(0.1, 0.0, abs(l2.y - fract(u_time * 0.5 + 0.3))) * 0.03 / (l2.x + 0.001);
  float pulse3 = smoothstep(0.1, 0.0, abs(l3.y - fract(u_time * 0.3 + 0.7))) * 0.015 / (l3.x + 0.001);
  glow += pulse1 + pulse2 + pulse3;

  vec2 p1 = center + dirUp * clamp(dot(mouseUV - center, dirUp), 0.0, 5.0);
  vec2 p2 = center + dirLeft * clamp(dot(mouseUV - center, dirLeft), 0.0, 5.0);
  vec2 p3 = center + dirDownRight * clamp(dot(mouseUV - center, dirDownRight), 0.0, 5.0);

  float lgt1 = lightning(uv, p1, mouseUV, u_time);
  float lgt2 = lightning(uv, p2, mouseUV, u_time + 10.0);
  float lgt3 = lightning(uv, p3, mouseUV, u_time + 20.0);

  float flicker = step(0.1, noise(u_time * 60.0)) * (noise(u_time * 150.0) * 0.8 + 0.2);

  float d1 = length(mouseUV - p1);
  float d2 = length(mouseUV - p2);
  float d3 = length(mouseUV - p3);

  glow += lgt1 * smoothstep(2.0, 0.0, d1) * u_mouseActive * flicker;
  glow += lgt2 * smoothstep(2.0, 0.0, d2) * u_mouseActive * flicker;
  glow += lgt3 * smoothstep(2.0, 0.0, d3) * u_mouseActive * flicker;

  float distToCenter = length(uv - center);
  glow += 0.04 / (distToCenter + 0.01);

  // Hero cloud-field blues (ridge / haze / star tones)
  vec3 baseColor = vec3(0.38, 0.55, 1.0);
  vec3 laser = baseColor * glow;

  laser *= 0.85 + 0.15 * sin(u_time * 2.0 - distToCenter * 8.0);

  // Soften laser on the left so copy stays readable (ground stays site gray-900)
  float leftClear = smoothstep(-1.35, 0.15, uv.x);
  laser *= mix(0.12, 1.0, leftClear);

  // Fade laser out at top/bottom so section seams dissolve into neighbors
  float ny = gl_FragCoord.y / u_resolution.y;
  float edgeFade = smoothstep(0.0, 0.18, ny) * smoothstep(1.0, 0.82, ny);
  laser *= edgeFade;

  float vignette = 1.0 - smoothstep(0.55, 2.1, length(uv));
  laser *= 0.75 + vignette * 0.25;

  float n = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  laser += n * 0.012 * edgeFade;

  // Exact site gray-900 (#0a0a0f) — additive so seams match Testimonials / App
  vec3 ground = vec3(0.0392, 0.0392, 0.0588);
  vec3 finalColor = ground + laser;

  gl_FragColor = vec4(finalColor, 1.0);
}
`;
