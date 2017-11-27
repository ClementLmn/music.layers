import {synth} from './midiSound';
import Tone from 'Tone';
import Line from '../viz/Line';
import {scene} from '../viz/sceneInit';
import { TweenMax } from 'gsap';

const voices = {};
let lastLine;

export const notePlay = (note, frequency) => {
    let thisLine;
    if(Object.keys(voices).length > 0){
        thisLine = new Line(note, voices, 2, (frequency).toFixed(2), 4, lastLine.place + 1);
    }else{
        thisLine = new Line(note, voices, 2, (frequency).toFixed(2), 4);
    }
    voices[note] = thisLine;
    lastLine = thisLine;
    scene.add(thisLine.mesh);
}

export const noteStop = (note, frequency) => {
    // on enleve la note du tableau mais on la garde
    let noteToKill = voices[note];
    delete voices[note];


    TweenMax.to(noteToKill.mesh.scale, 0.3, {x :0.001, onComplete: function(){
        scene.remove(noteToKill.mesh);
        noteToKill = null;
        // on dégage celle quon a gardé
    }});
}

export const getVoices = (scene) => {
    return voices;
}