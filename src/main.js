import Tone from 'Tone';
import WebMidi from 'webmidi';
import * as THREE from 'three';
import Stats from 'stats.js';

import './scss/core.scss';

import {initMidi} from './sound/midiSound';
import {initKeyboard} from './sound/keyboard';
import * as sceneInit from './viz/sceneInit';
import {initRec, getLoops} from './sound/loops';
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

// Salamander
import c4 from './sound/sample/salamander/C4.mp3';
import c5 from './sound/sample/salamander/C5.mp3';
import c3 from './sound/sample/salamander/C3.mp3';
import c6 from './sound/sample/salamander/C6.mp3';




import { init } from './viz/sceneInit';

const stats = new Stats();
document.body.appendChild(stats.domElement);
const synth = new Tone.Sampler({
    "C4" : c4,
    "C5" : c5,
    "C6" : c6,
    "C3" : c3
},{
    'release' : 1
}).toMaster();

const sampler = new Tone.Sampler({
    "C3" : kick,
    "C#3" : clap,
    "D3" : bell,
    "D#3" : clav,
    "E3" : closedhit,
    "F3" : conga,
    "F#3" : cymbal,
    "G3" : lowconga,
    "G#3" : lowtom,
    "A3" : maracas,
    "A#3" : rim,
    "B3" : snare,
    "C4" : tom
},{
    'release' : 1
}).toMaster();


sceneInit.init();

Tone.Transport.bpm.value = 120;
Tone.Transport.loop = true;
Tone.Transport.loopStart = "0:0:0";
Tone.Transport.loopEnd = "4:0:0";
Tone.Transport.start();

animate(sceneInit.scene, sceneInit.camera, sceneInit.renderer, stats);
initMidi(synth, sampler);
initKeyboard(synth, sampler);
initRec(synth);

document.querySelector('#pause').addEventListener('click', function(){
    this.classList.toggle('paused');
    Tone.Transport.toggle();
});

addEventListener('resize', () => {
    sceneInit.resizeHandler();
});

