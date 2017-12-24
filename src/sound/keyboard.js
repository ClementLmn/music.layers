import Tone from 'Tone';
import AudioKeys from 'audiokeys'
import {notePlay, noteStop} from './voices';

export const initKeyboard = (synth, sampler) => {

    var keyboard = new AudioKeys({
        polyphony: 3,
        rows: 2,
        priority: 'lowest'
      });

    keyboard.down( function(data) {
        const whichSynth = document.querySelector('input[name="sound"]:checked').value;
        const note = data.note;
        const frequency = Tone.Frequency().midiToFrequency(note);

        if(whichSynth == 'synth'){
            synth.triggerAttack(frequency);
            notePlay(note, frequency);
        }else{
            sampler.triggerAttack(frequency);
        }
        


    });
    
    keyboard.up( function(data) {
        const whichSynth = document.querySelector('input[name="sound"]:checked').value;
        const note = data.note;
        const frequency = Tone.Frequency().midiToFrequency(note);        

        if(whichSynth == 'synth'){
            synth.triggerRelease(frequency);
            noteStop(note, frequency);
        }else{
            sampler.triggerRelease(frequency);
        }


        
    });
}


