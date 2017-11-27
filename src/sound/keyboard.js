import Tone from 'Tone';
import AudioKeys from 'audiokeys'
import {notePlay, noteStop} from './voices';


export const synth = new Tone.PolySynth(3).toMaster();

export const initKeyboard = () => {

    var keyboard = new AudioKeys({
        polyphony: 3,
        rows: 2,
        priority: 'lowest'
      });

    keyboard.down( function(data) {
        const note = data.note;
        const frequency = Tone.Frequency().midiToFrequency(note);
        synth.triggerAttack(frequency);
        notePlay(note, frequency);
    });
    
    keyboard.up( function(data) {
        const note = data.note;
        const frequency = Tone.Frequency().midiToFrequency(note);        
        synth.triggerRelease(frequency);
        noteStop(note, frequency);
    });
}


