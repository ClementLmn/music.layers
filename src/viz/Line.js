import {scene} from './sceneInit';
// shaders
import vertex from './shaders/vertex.glsl';
import fragment from './shaders/fragment.glsl';
import {TweenMax} from 'gsap';

class Line{
    constructor(note, voices, ampl, freq, speed, z = 0, y = 5){
        this.ampl = ampl;
        this.note = note;
        this.freq = freq;
        this.speed = speed;
        this.place = z;
        this.placeY = y;
        this.dead = false;
        switch(z%3){
            case 0:
                this.color = new THREE.Color(0xe07a57);
                break;
            case 1:
                this.color = new THREE.Color(0x4fe2b3);
                break;
            case 2:
                this.color = new THREE.Color(0xd456e0);
                break;
            default:
                this.color = new THREE.Color(0x333333);
                break;
        }

        var uniforms = THREE.UniformsUtils.merge([
            THREE.UniformsLib['lights'],
            { 
                diffuse: { type: 'c', value: this.color },
                lightPosition: {type: 'v3', value: new THREE.Vector3(-150, 150, 0)},
                count: { value: 0.0 },
                freq: { type: 'f', value: this.freq },
            }
        ]);

        this.material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertex,
            fragmentShader: fragment,
            lights:true,
            flatShading: true
        });
        this.mesh = new THREE.Mesh( new THREE.BoxGeometry( 80, 8, 8 , 60), this.material);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.mesh.rotation.z = 0.2;
        this.mesh.position.y = this.placeY;
        this.mesh.position.z -= z*10;
    }
}

export default Line;