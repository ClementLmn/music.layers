uniform float count; // same for all vertex on the same render loop
uniform float freq; // same for all vertex on the same render loop
//float freq = 440.0; //0.05 to 0.8
float speed = 0.8;
float ampl = 4.0;


void main() {
	float t = 1.0/freq;
	float y = position.y + ampl * sin(freq/2000.0 * (position.x + count * speed));
	//(i + count * v.speed)
	vec3 newPos = vec3(position.x, y, position.z);
	gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
}