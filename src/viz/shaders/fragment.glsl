uniform vec3 diffuse;
varying vec3 vNormal;
varying vec3 vWorldPosition;

uniform vec3 lightPosition;

void main() {
//   vec4 addedLights = vec4(0.1, 0.1, 0.1, 1.0);
//   for(int l = 0; l < NUM_POINT_LIGHTS; l++) {
//     vec3 adjustedLight = pointLights[l].position + cameraPosition;
//     vec3 lightDirection = normalize(adjustedLight);
//     addedLights.rgb += clamp(dot(-lightDirection, vNormal), 0.0, 1.0) * pointLights[l].color;
//   }
//   gl_FragColor = mix(vec4(diffuse.x, diffuse.y, diffuse.z, 1.0), addedLights, addedLights);

	vec3 lightDirection = normalize(lightPosition - vWorldPosition);

    // simpliest hardcoded lighting ^^
    float c1 = diffuse.x + max(0.0, dot(vNormal, lightDirection)) * 0.3;
	float c2 = diffuse.y + max(0.0, dot(vNormal, lightDirection)) * 0.3;
	float c3 = diffuse.z + max(0.0, dot(vNormal, lightDirection)) * 0.3;
	//vec3 color = vec3(diffuse.x + max(0.0, dot(vNormal, lightDirection)) * 0.4, diffuse.y + max(0.0, dot(vNormal, lightDirection)) * 0.4, diffuse.z + max(0.0, dot(vNormal, lightDirection)) * 0.4)

    gl_FragColor = vec4(c1, c2, c3, 1.0);
}