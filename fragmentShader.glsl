uniform sampler2D image;
uniform sampler2D depthMap;
uniform vec2 mouse;
uniform float depthMultiplier;
varying vec2 vUv;

void main() {
  float depth = texture2D(depthMap, vUv).r;
  vec2 uv = vUv - depth * depthMultiplier * mouse;
  vec3 color = texture2D(image, uv).rgb;
  gl_FragColor = vec4(color, 1.0);
}