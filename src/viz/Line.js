import {scene} from './sceneInit';
class Line{
    constructor(color, ampl, freq, speed, z = 0){
        this.material = new THREE.MeshPhongMaterial({
            color: color, 
            flatShading : true, 
            side: THREE.DoubleSide
        });
        this.mesh = new THREE.Mesh( new THREE.BoxGeometry( 80, 8, 8 , 60), this.material);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.mesh.rotation.z = 0.2;
        this.mesh.position.y = 5;
        this.mesh.position.z -= z;

        this.ampl = ampl;
        this.freq = freq;
        this.speed = speed;
    }

    
    
}

export default Line;