import {synth} from './midiSound';
import Tone from 'Tone';
import Line from '../viz/Line';
import {scene} from '../viz/sceneInit';

const voices = {};
let lastLine;

export const notePlay = (note) => {
    const frequency = Tone.Frequency().midiToFrequency(note);
    let thisLine;
    if(Object.keys(voices).length > 0){
        thisLine = new Line(voices, 2, (frequency).toFixed(2), 4, lastLine.place + 1);
    }else{
        thisLine = new Line(voices, 2, (frequency).toFixed(2), 4);
    }
    voices[note] = thisLine;
    lastLine = thisLine;
    scene.add(thisLine.mesh);
}

export const noteStop = note => {
    const freq = Tone.Frequency().midiToFrequency(note);
    scene.remove(voices[note].mesh);
    delete voices[note];
}

export const getVoices = (scene) => {
    return voices;
}