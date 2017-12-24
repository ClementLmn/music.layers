uniform float count; // same for all vertex on the same render loop
uniform float freq; // same for all vertex on the same render loop
//float freq = 440.0; //0.05 to 0.8
float speed = 1.5;
float ampl = 3.0;
vec3 vPos;
varying vec3 vNormal;
varying vec3 vWorldPosition;
void main() {

	float t = 1.0/freq;
	float y = position.y + ampl * sin(freq/2000.0 * (position.x + count * speed));
	//(i + count * v.speed)
	vec3 newPos = vec3(position.x, y, position.z);
	vPos = (modelMatrix * vec4(newPos, 1.0 )).xyz;

    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    // store the world position as varying for lighting
    vWorldPosition = worldPosition.xyz;
	vNormal = normalMatrix * normal;

	gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
}