import * as THREE from 'three';
import 'three/examples/js/controls/OrbitControls';

export let renderer; 
export let scene;
export let camera;
const D = 200;
let aspectRatio = window.innerWidth / window.innerHeight;

export const init = () => {
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.shadowMap.enabled = true;
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x1A1A1A );

    
    const nearPlane = 1;
    const farPlane = 10000;
    
    camera = new THREE.OrthographicCamera(-D*aspectRatio, D*aspectRatio, D, -D, nearPlane, farPlane)
    camera.position.set(-800, 800, 800);
    camera.lookAt(scene.position)

    const controls = new THREE.OrbitControls (camera, renderer.domElement);

    // LES LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // soft white light
    scene.add( ambientLight );

    const bulb = new THREE.PointLight(0xffffff);
    bulb.angle = Math.PI/4;
    bulb.castShadow = true;
    bulb.penumbra = 0.4;
    bulb.decay = 2;
    bulb.distance = 450; 
    bulb.position.set(0,150,0);
    bulb.shadow.camera.left = -40;
    bulb.shadow.camera.right = 40;
    bulb.shadow.camera.top = 40;
    bulb.shadow.camera.bottom = -40;
    bulb.shadow.camera.near = 1;
    bulb.shadow.camera.far = 1000;
    bulb.shadow.mapSize.width = bulb.shadow.mapSize.height = 2048;
    scene.add( bulb );

    // LE SOOOOL
    const matFloor = new THREE.MeshPhongMaterial({
        color: 0x1A1A1A, 
        flatShading : true, 
        side: THREE.DoubleSide
    });

    const floor = new THREE.Mesh( new THREE.PlaneGeometry( 2050, 2050, 32 ), matFloor );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -50;
    floor.receiveShadow = true;
    scene.add( floor );
}



export const resizeHandler = () => {
    aspectRatio = window.innerWidth / window.innerHeight;
    camera.left = -D*aspectRatio;
    camera.right = D*aspectRatio;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};