import {scene} from './sceneInit';
// shaders
import vertex from './shaders/vertex.glsl';
import fragment from './shaders/fragment.glsl';


class Line{
    constructor(color, ampl, freq, speed, z = 0){
        // this.material = new THREE.MeshPhongMaterial({
        //     color: color, 
        //     flatShading : true, 
        //     side: THREE.DoubleSide
        // });
        this.ampl = ampl;
        this.freq = freq;
        this.speed = speed;
        this.color = new THREE.Color(color);
        console.log(new THREE.Color(color).convertLinearToGamma());

        this.material = new THREE.ShaderMaterial({
            uniforms: {
                count: { value: 0.0 },
                freq: { type: 'f', value: this.freq },
                color: {type: 'v3', value: new THREE.Vector3( this.color.r, this.color.g, this.color.b )}
            },
            vertexShader: vertex,
            fragmentShader: fragment,
        });
        this.mesh = new THREE.Mesh( new THREE.BoxGeometry( 80, 8, 8 , 60), this.material);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.mesh.rotation.z = 0.2;
        this.mesh.position.y = 5;
        this.mesh.position.z -= z;

       
    }

    
    
}

export default Line;