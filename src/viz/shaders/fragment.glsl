uniform vec3 diffuse;
varying vec3 vNormal;
varying vec3 vWorldPosition;

uniform vec3 lightPosition;

void main() {

	vec3 lightDirection = normalize(lightPosition - vWorldPosition);

    float c1 = diffuse.x + max(0.0, dot(vNormal, lightDirection)) * 0.3;
	float c2 = diffuse.y + max(0.0, dot(vNormal, lightDirection)) * 0.3;
	float c3 = diffuse.z + max(0.0, dot(vNormal, lightDirection)) * 0.3;

    gl_FragColor = vec4(c1, c2, c3, 1.0);
}