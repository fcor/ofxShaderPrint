#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
const int AMOUNT = 2;

void main(){
  vec2 p = 24.0 * (gl_FragCoord.xy - u_resolution / 2.0) / min(u_resolution.y, u_resolution.x);

  float len;
  float t = u_time*0.2;

  for(int i = 0; i < AMOUNT; i++){
    len = length(vec2(p.y, p.y));
    p.x = p.x - sin(p.y + sin(len)) + cos(t / 2.0)*22.0;
    p.y = p.y + sin(p.x + cos(len)) + sin(t / 2.0)*22.0;
    // p.x = p.x/len*(sin(len)+1.)*abs(sin(t*9.-len*2.));
    // p.y = p.y/len*(sin(len)+1.)*abs(sin(t*9.-len*2.));
  }

  vec3 col = vec3(cos(len*.2), cos(len), sin(len*.6));
  //col = 0.5 + 0.9*cos(len+p.yxy+vec3(0.6,.2,.4));
  col *= sin(p.x * cos(len / 10.0) * 13.0) + sin(p.y * cos(len / 11.2));
  col += cos(p.x * sin(len / 20.0) *3.8) + cos(p.y * sin(len / 10.7));
  gl_FragColor = vec4(col, 1.0);
}