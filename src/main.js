import Tone from 'Tone';
import WebMidi from 'webmidi';
import * as THREE from 'three';
import Stats from 'stats.js';

import './scss/core.scss';

import {initMidi, synth} from './sound/midiSound';
import * as sceneInit from './viz/sceneInit';
import animate from './viz/animate';

const stats = new Stats();
document.body.appendChild(stats.domElement);
sceneInit.init();

animate(sceneInit.scene, sceneInit.camera, sceneInit.renderer, stats);
initMidi();
// console.log(synth);


addEventListener('resize', () => {
    sceneInit.resizeHandler();
});

