import Tone from 'Tone';
import AudioKeys from 'audiokeys'
import {notePlay, noteStop} from './voices';

var record = false;
let dataRec, sound;

export const initKeyboard = (synth, sampler) => {

    var keyboard = new AudioKeys({
        polyphony: 3,
        rows: 1,
        priority: 'lowest',
        rootNote: 48
      });

    keyboard.down( function(data) {
        const whichSynth = document.querySelector('input[name="sound"]:checked').value;
        const note = data.note;
        const frequency = Tone.Frequency().midiToFrequency(note);
        

        if(whichSynth == 'synth'){
            sound = synth;
            synth.triggerAttack(frequency);
            notePlay(note, frequency);
        }else{
            sound = sampler;
            sampler.triggerAttack(frequency);
        }

        if(record){
            const data = {
                'note': Tone.Frequency(note, "midi").toNote(),
                'time': Tone.Time(Tone.Transport.position).toSeconds()
            }
            dataRec.push(data);
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

        if(record){
            dataRec.forEach(function(el) {
                if(el.note == Tone.Frequency(note, "midi").toNote() && el.timeEnd == undefined) el.timeEnd = Tone.Time(Tone.Transport.position).toSeconds();
            });
        }
    });
}

export const rec = () => {
    dataRec = [];
    record = true;
}

export const dataRecorded = () => {
    return {
        notes : dataRec,
        sound : sound
    };
}

export const stopRec = () => {
    record = false;
}


