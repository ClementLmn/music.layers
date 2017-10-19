import Tone from 'Tone';
import WebMidi from 'webmidi';
import * as THREE from 'three';
import threeOrbitControls from './utils/OrbitControls';
import Stats from 'stats.js';

import './scss/core.scss';

import {initMidi} from './sound/midiSound.js';
import * as sceneInit from './viz/sceneInit.js';
import animate from './viz/animate.js';

const stats = new Stats();
document.body.appendChild(stats.domElement);
sceneInit.init();

const lineMat = new THREE.MeshPhongMaterial({
    color: 0xe07a57, 
    flatShading : true, 
    side: THREE.DoubleSide
});

const line2Mat = new THREE.MeshPhongMaterial({
    color: 0x4fe2b3, 
    flatShading : true, 
    side: THREE.DoubleSide
});



const line = new THREE.Mesh( new THREE.BoxGeometry( 80, 8, 8 , 60), lineMat );
line.castShadow = true;
line.receiveShadow = true;
line.geometry.verticesNeedUpdate = true;
sceneInit.scene.add( line );

const line2 = new THREE.Mesh( new THREE.BoxGeometry( 80, 8, 8 , 60), line2Mat );
line2.castShadow = true;
line2.receiveShadow = true;
line2.geometry.verticesNeedUpdate = true;
line2.position.z -= 10;
sceneInit.scene.add( line2 );

console.log(line.geometry.vertices);



animate(sceneInit.scene, sceneInit.camera, sceneInit.renderer, stats, line, line2);
initMidi();


addEventListener('resize', () => {
    sceneInit.resizeHandler();
});

