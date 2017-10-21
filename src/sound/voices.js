import {synth} from './midiSound';
import Tone from 'Tone';
import Line from '../viz/Line';

const voices = [];

export const notePlay = (freq) => {

    console.log(new Tone.Frequency(freq).toSeconds() * 10);
    const frequency = new Tone.Frequency(freq).toSeconds() * 10;
    const thisLine = new Line(0xe07a57, 2, frequency, 4);
    //voices.push(thisLine);
}

export const noteStop = () => {
    
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

    const v1 = new Line(0xe07a57, 2, 0.05, 4);
    const v2 = new Line(0x4fe2b3, 2, 0.06, 4, 10);
    const v3 = new Line(0xd456e0, 4.4, 0.03, 4, 20);

    voices.push(v1, v2, v3);
    voices.forEach((e) => {
        scene.add(e.mesh);
    }, this);

    return voices;
}