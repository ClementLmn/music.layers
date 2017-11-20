import {synth} from './midiSound';
import Tone from 'Tone';
import Line from '../viz/Line';
import {scene} from '../viz/sceneInit';
import { TweenMax } from 'gsap';

const voices = {};
let lastLine;

export const notePlay = (note) => {
    const frequency = Tone.Frequency().midiToFrequency(note);
    let thisLine;
    if(Object.keys(voices).length > 0){
        thisLine = new Line(note, voices, 2, (frequency).toFixed(2), 4, lastLine.place + 1);
    }else{
        thisLine = new Line(note, voices, 2, (frequency).toFixed(2), 4);
    }
    voices[note] = thisLine;
    lastLine = thisLine;
    scene.add(thisLine.pivot);
    console.log(thisLine);
}

export const noteStop = note => {
    // on enleve la note du tableau mais on la garde
    
    const freq = Tone.Frequency().midiToFrequency(note);
    let noteToKill = voices[note];
    delete voices[note];


    TweenMax.to(noteToKill.pivot.scale, 0.3, {x :0.001, onComplete: function(){
        scene.remove(noteToKill.pivot);
        noteToKill = null;
        // on dégage celle quon a gardé
    }});
}

export const getVoices = (scene) => {
    return voices;
}