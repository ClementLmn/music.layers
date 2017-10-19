import {synth} from './midiSound';
import Line from '../viz/Line';

const voices = [];


export const getVoices = (scene) =>{

    const synthVoices = synth.voices;

    let prevVoice;

    // synthVoices.forEach((v, i) => {
    //     const z = i * 10;
    //     if(v.frequency.value !== prevVoice){
    //         voices.push(new Line(0xe07a57, 2, 0.05, 4, z));
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