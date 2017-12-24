import Tone from 'Tone';
import WebMidi from 'webmidi';
import * as THREE from 'three';
import Stats from 'stats.js';

import './scss/core.scss';

import {initMidi} from './sound/midiSound';
import {initKeyboard} from './sound/keyboard';
import * as sceneInit from './viz/sceneInit';
import animate from './viz/animate';

// Drums
import kick from './sound/sample/kick.mp3';
import clap from './sound/sample/clap.mp3';
import bell from './sound/sample/bell.mp3';
import clav from './sound/sample/clav.mp3';
import closedhit from './sound/sample/closedhit.mp3';
import conga from './sound/sample/conga.mp3';
import cymbal from './sound/sample/cymbal.mp3';
import lowconga from './sound/sample/lowconga.mp3';
import lowtom from './sound/sample/lowtom.mp3';
import maracas from './sound/sample/maracas.mp3';
import rim from './sound/sample/rim.mp3';
import snare from './sound/sample/snare.mp3';
import tom from './sound/sample/tom.mp3';

const stats = new Stats();
document.body.appendChild(stats.domElement);
const synth =  new Tone.PolySynth(3).toMaster();

const sampler = new Tone.Sampler({
    "C4" : kick,
    "C#4" : clap,
    "D4" : bell,
    "D#4" : clav,
    "E4" : closedhit,
    "F4" : conga,
    "F#4" : cymbal,
    "G4" : lowconga,
    "G#4" : lowtom,
    "A4" : maracas,
    "A#4" : rim,
    "B4" : snare,
    "C5" : tom,
}).toMaster();

console.log(Tone.Buffer.supportsType('mp3'))
console.log(Tone.Buffer.supportsType('aif'))
console.log(Tone.Buffer.supportsType('aiff'))


sceneInit.init();

animate(sceneInit.scene, sceneInit.camera, sceneInit.renderer, stats);
initMidi(synth);
initKeyboard(synth, sampler);


addEventListener('resize', () => {
    sceneInit.resizeHandler();
});

