/** Authored strata / cloud-field GLSL. Palette regraded cooler (HK night). */

export const CLOUD_FIELD_VERTEX = `
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

export const CLOUD_FIELD_FRAGMENT = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_scroll;

float hash(float n){ return fract(sin(n)*43758.5453123); }
float hash2(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }

float noise(float x){
    float i = floor(x);
    float f = fract(x);
    f = f*f*(3.0-2.0*f);
    return mix(hash(i), hash(i+1.0), f);
}

float fbm(float x, float octaves){
    float val = 0.0;
    float amp = 0.5;
    float freq = 1.0;
    for(int i = 0; i < 6; i++){
        if(float(i) >= octaves) break;
        val += amp * noise(x * freq);
        freq *= 2.17;
        amp *= 0.48;
    }
    return val;
}

float meteor(vec2 uv, float t){
    float cycle = mod(t * 0.15, 1.0);
    float seed = floor(t * 0.15);
    float h = hash(seed * 7.31);
    float h2 = hash(seed * 13.17);
    if(h > 0.30) return 0.0;
    vec2 start = vec2(0.2 + h2 * 0.6, 0.7 + h * 0.25);
    vec2 dir = normalize(vec2(1.0, -0.6 - h * 0.3));
    float progress = smoothstep(0.0, 0.7, cycle);
    vec2 pos = start + dir * progress * 0.5;
    vec2 toP = uv - pos;
    float along = dot(toP, dir);
    float perp = length(toP - dir * along);
    float trail = smoothstep(0.0, -0.12, along) * smoothstep(-0.18, -0.04, along);
    float core = smoothstep(0.003, 0.0, perp) * trail;
    float glow = smoothstep(0.012, 0.0, perp) * trail * 0.3;
    float fade = smoothstep(0.0, 0.1, cycle) * smoothstep(0.8, 0.55, cycle);
    return (core + glow) * fade;
}

float stars(vec2 uv, float density){
    vec2 cell = floor(uv * density);
    vec2 sub = fract(uv * density);
    float h = hash2(cell);
    float brightness = step(0.975, h);
    float size = 0.025 + h * 0.045;
    float d = length(sub - vec2(hash2(cell + 100.0), hash2(cell + 200.0)));
    float star = brightness * smoothstep(size, 0.0, d);
    star *= 0.5 + 0.5 * sin(u_time * (1.0 + h * 3.0) + h * 6.28);
    return star;
}

void main(){
    vec2 uv = gl_FragCoord.xy / u_res;
    float aspect = u_res.x / u_res.y;
    float scroll = clamp(u_scroll, 0.0, 1.0);

    // Zoom toward left copy + pull mid-field clouds left so the mass closes on the words
    float zoom = 1.0 + scroll * 0.32;
    vec2 anchor = vec2(0.28, 0.48);
    uv = anchor + (uv - anchor) / zoom;
    uv.x += scroll * 0.10;

    vec2 mouse = u_mouse * 2.0 - 1.0;

    // Cooler HK-night grade (was violet Strata)
    vec3 skyTop    = vec3(0.010, 0.014, 0.038);
    vec3 skyMid    = vec3(0.022, 0.032, 0.072);
    vec3 skyBottom = vec3(0.040, 0.055, 0.110);

    float skyGrad = uv.y;
    vec3 col = mix(skyBottom, skyMid, smoothstep(0.3, 0.6, skyGrad));
    col = mix(col, skyTop, smoothstep(0.6, 1.0, skyGrad));

    float horizonY = 0.35 + scroll * 0.045;
    float horizonGlow = exp(-pow((uv.y - horizonY) * 3.8, 2.0));
    col += vec3(0.08, 0.12, 0.26) * horizonGlow * 0.8;

    float centerGlow = exp(-pow((uv.x - (0.5 - scroll * 0.13)) * 1.5, 2.0)) * exp(-pow((uv.y - horizonY) * 4.0, 2.0));
    col += vec3(0.08, 0.12, 0.22) * centerGlow * 0.6;

    float starField = stars(uv * vec2(aspect, 1.0), 60.0)
                    + stars(uv * vec2(aspect, 1.0) + 500.0, 100.0) * 0.7
                    + stars(uv * vec2(aspect, 1.0) + 900.0, 160.0) * 0.4;

    float starMask = 1.0;
    float xC, yS, prof, mTop, mtn, rDist, rGlow, rAmb;
    vec3 lC;
    vec3 ridge = vec3(0.12, 0.18, 0.34);
    vec3 ridgeAmb = vec3(0.08, 0.12, 0.22);

    // Layer 0 (far) — rises toward type
    lC = vec3(0.10, 0.12, 0.22);
    xC = uv.x * aspect * 1.6 + u_time * 0.006 + mouse.x * 0.010 - scroll * 0.05;
    yS = mouse.y * 0.003 + scroll * 0.04;
    prof = fbm(xC, 5.0) * 0.10 + fbm(xC * 0.3 + 17.0, 3.0) * 0.07;
    mTop = 0.40 + prof + yS;
    mtn = smoothstep(mTop + 0.003, mTop - 0.001, uv.y);
    rDist = abs(uv.y - mTop);
    rGlow = smoothstep(0.012, 0.0, rDist) * 0.18;
    rAmb = smoothstep(0.04, 0.0, rDist) * 0.06;
    col = mix(col, lC, mtn);
    col += ridge * rGlow;
    col += ridgeAmb * rAmb;
    starMask *= (1.0 - mtn);

    // Layer 1
    lC = vec3(0.07, 0.09, 0.17);
    xC = uv.x * aspect * 2.0 + u_time * 0.012 + mouse.x * 0.020 - scroll * 0.09;
    yS = mouse.y * 0.006 + scroll * 0.06;
    prof = fbm(xC, 5.0) * 0.13 + fbm(xC * 0.3 + 34.0, 3.0) * 0.091;
    mTop = 0.33 + prof + yS;
    mtn = smoothstep(mTop + 0.003, mTop - 0.001, uv.y);
    rDist = abs(uv.y - mTop);
    rGlow = smoothstep(0.012, 0.0, rDist) * 0.15;
    rAmb = smoothstep(0.04, 0.0, rDist) * 0.045;
    col = mix(col, lC, mtn);
    col += ridge * rGlow;
    col += ridgeAmb * rAmb;
    starMask *= (1.0 - mtn);

    // Layer 2
    lC = vec3(0.05, 0.06, 0.13);
    xC = uv.x * aspect * 2.6 + u_time * 0.020 + mouse.x * 0.034 - scroll * 0.13;
    yS = mouse.y * 0.010 + scroll * 0.08;
    prof = fbm(xC, 5.0) * 0.16 + fbm(xC * 0.3 + 51.0, 3.0) * 0.112;
    mTop = 0.26 + prof + yS;
    mtn = smoothstep(mTop + 0.003, mTop - 0.001, uv.y);
    rDist = abs(uv.y - mTop);
    rGlow = smoothstep(0.012, 0.0, rDist) * 0.12;
    rAmb = smoothstep(0.04, 0.0, rDist) * 0.03;
    col = mix(col, lC, mtn);
    col += ridge * rGlow;
    col += ridgeAmb * rAmb;
    starMask *= (1.0 - mtn);

    // Layer 3
    lC = vec3(0.03, 0.04, 0.08);
    xC = uv.x * aspect * 3.2 + u_time * 0.030 + mouse.x * 0.050 - scroll * 0.17;
    yS = mouse.y * 0.015 + scroll * 0.09;
    prof = fbm(xC, 5.0) * 0.14 + fbm(xC * 0.3 + 68.0, 3.0) * 0.098;
    mTop = 0.18 + prof + yS;
    mtn = smoothstep(mTop + 0.003, mTop - 0.001, uv.y);
    rDist = abs(uv.y - mTop);
    rGlow = smoothstep(0.012, 0.0, rDist) * 0.09;
    col = mix(col, lC, mtn);
    col += ridge * rGlow;
    starMask *= (1.0 - mtn);

    // Layer 4 (near) — strongest approach toward the words
    lC = vec3(0.018, 0.022, 0.048);
    xC = uv.x * aspect * 4.0 + u_time * 0.044 + mouse.x * 0.070 - scroll * 0.22;
    yS = mouse.y * 0.021 + scroll * 0.12;
    prof = fbm(xC, 5.0) * 0.11 + fbm(xC * 0.3 + 85.0, 3.0) * 0.077;
    mTop = 0.09 + prof + yS;
    mtn = smoothstep(mTop + 0.003, mTop - 0.001, uv.y);
    rDist = abs(uv.y - mTop);
    rGlow = smoothstep(0.012, 0.0, rDist) * 0.06;
    col = mix(col, lC, mtn);
    col += ridge * rGlow;
    starMask *= (1.0 - mtn);

    col += vec3(0.85, 0.90, 1.0) * starField * starMask;
    float met = meteor(uv * vec2(aspect, 1.0), u_time);
    col += vec3(0.70, 0.85, 1.0) * met * starMask;

    float vig = 1.0 - 0.3 * pow(length((uv - 0.5) * vec2(1.1, 1.6)), 2.0);
    col *= vig;

    float haze = exp(-pow((uv.y - 0.33) * 5.0, 2.0)) * 0.05;
    col += vec3(0.10, 0.14, 0.28) * haze;

    col = pow(col, vec3(0.95));

    gl_FragColor = vec4(col, 1.0);
}
`;
