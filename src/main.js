import Tone from 'Tone';
import WebMidi from 'webmidi';
import * as THREE from 'three';
import Stats from 'stats.js';

import './scss/core.scss';

import {initMidi, synth} from './sound/midiSound.js';
import * as sceneInit from './viz/sceneInit.js';
import animate from './viz/animate.js';

const stats = new Stats();
document.body.appendChild(stats.domElement);
sceneInit.init();

const voices = [];

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

const line3Mat = new THREE.MeshPhongMaterial({
    color: 0xd456e0,
    flatShading : true,
    side: THREE.DoubleSide
});





const line = new THREE.Mesh( new THREE.BoxGeometry( 80, 8, 8 , 60), lineMat );
line.castShadow = true;
line.receiveShadow = true;
line.rotation.z = 0.2;
line.position.y = 5;
sceneInit.scene.add( line );
const voice1 = {
    mesh: line,
    ampl: 2,
    freq: 0.05,
    speed: 4
};


const line2 = new THREE.Mesh( new THREE.BoxGeometry( 80, 8, 8 , 60), line2Mat );
line2.castShadow = true;
line2.receiveShadow = true;
line2.position.z -= 10;
line2.position.y = 5;
line2.rotation.z = 0.2;
sceneInit.scene.add( line2 );
const voice2 = {
    mesh: line2,
    ampl: 2,
    freq: 0.06,
    speed: 4
};

const line3 = new THREE.Mesh( new THREE.BoxGeometry( 80, 8, 8 , 60), line3Mat );
line3.castShadow = true;
line3.receiveShadow = true;
line3.position.z -= 20;
line3.position.y = 5;
line3.rotation.z = 0.2;
sceneInit.scene.add( line3 );
const voice3 = {
    mesh: line3,
    ampl: 4.4,
    freq: 0.03,
    speed: 4
};

//VOIR LES OBJETS DANS LE ANIMATE

voices.push(voice1, voice2, voice3);



animate(sceneInit.scene, sceneInit.camera, sceneInit.renderer, stats, voices);
initMidi();
// console.log(synth);


addEventListener('resize', () => {
    sceneInit.resizeHandler();
});

