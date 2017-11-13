import {synth} from './midiSound';
import Tone from 'Tone';
import Line from '../viz/Line';
import {scene} from '../viz/sceneInit';

const voices = [];

export const notePlay = (note) => {
    const frequency = Tone.Frequency().midiToFrequency(note);
    const thisLine = new Line(2, (frequency).toFixed(2), 4, Object.keys(voices).length);
    voices.push(thisLine)
    console.log(thisLine);
    scene.add(thisLine.mesh);
}

export const noteStop = note => {
    const freq = Tone.Frequency().midiToFrequency(note)
    voices.forEach((e, i) => {
        console.log(e);
        if(e.freq == (freq).toFixed(2)){
            scene.remove(e.mesh);
            voices.splice(voices[i], 1);
        }
    }, this);
}

export const getVoices = (scene) =>{

    const synthVoices = synth.voices;

    // let prevVoice;
    // synthVoices.forEach((v, i) => {
    //     const z = i * 10;
    //     if(v.frequency.value !== prevVoice){
    //         const newLine = new Line(0xe07a57, 2, 0.05, 4, z)
    //         voices.push(newLine);
    //         scene.add(newLine.mesh);
    //     }
    //     prevVoice = v.frequency.value;

    // });

    // const v1 = new Line(0xe07a57, 2, 0.05, 4);
    // const v2 = new Line(0x4fe2b3, 2, 0.06, 4, 10);
    // const v3 = new Line(0xd456e0, 4.4, 0.03, 4, 20);

    // voices.push(v1, v2, v3);

    return voices;
}