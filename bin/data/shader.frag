#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))*43758.5453123);
}

//noise algorithme from Morgan McGuire
//https://www.shadertoy.com/view/4dS3Wd
float noise(vec2 st){
  vec2 ist = floor(st);
  vec2 fst = fract(st);

  //get 4 corners of the pixel
  float bl = random(ist);
  float br = random(ist + vec2(1.0, 0.0));
  float tl = random(ist + vec2(0.0, 1.0));
  float tr = random(ist + vec2(1.0, 1.0));

  //smooth interpolation using cubic function
  vec2 si = fst * fst * (3.0 - 2.0 * fst);

  //mix the four corner to get a noise value
  return mix(bl, br, si.x) +
         (tl - bl) * si.y * (1.0 - si.x) +
         (tr - br) * si.x * si.y;
}

void main(){
  vec2 p = 18.0 * gl_FragCoord.xy / u_resolution;

  float angle = sin(0.1*u_time);
  float c = cos(angle);
  float s = sin(angle);
  p *= mat2(c, -s, s, c);

  for(int n = 1; n < 30; n++){
    float i = float(n);
    p += vec2(0.8/ i * sin(i * p.y + u_time + 0.3 * i) + 0.8, 0.4 /i * sin(i*p.x + u_time + 2.3 * i) + 1.6);
  }

  p -= vec2(0.5 / cos(p.x + u_time + 0.3) + 0.8, 0.4 / cos(p.y + u_time + 0.3) + 1.6);
  vec3 col = vec3(0.1 * sin(p.x) + 0.2, 0.5 * sin(p.y) + 0.2, sin(p.x));
  //vec3 col = vec3(noise(p), cos(p.y), sin(p.x+0.3) );

  // col *= 0.9;

  gl_FragColor = vec4(col, 1.0);
}