import Tone from 'Tone';
import WebMidi from 'webmidi';
import {notePlay, noteStop} from './voices';


let tremoloActive;
let midi, data, midiEnable;
var record = false;
let dataRec, sound;


export const initMidi = (synth, sampler) => {
    WebMidi.enable((err) => {
        if (!err){
            midiEnable = true
            if (WebMidi.inputs){
                WebMidi.inputs.forEach((input) => bindInput(input))
            }
        }else{
            console.log(err);
        }
    });    

    const bindInput = inputDevice => {
        if (midiEnable){
            WebMidi.addListener('disconnected', (device) => {
                if (device.input){
                    device.input.removeListener('noteOn')
                    device.input.removeListener('noteOff')
                }
            })
            inputDevice.addListener('noteon', 'all', (event) => {
                const whichSynth = document.querySelector('input[name="sound"]:checked').value;
                const fullNote = event.note.name + event.note.octave;
                const note = event.note.number;
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
                    console.log(data);
                }
    
            })
            inputDevice.addListener('noteoff', 'all',  (event) => {
                const whichSynth = document.querySelector('input[name="sound"]:checked').value;
                const fullNote = event.note.name + event.note.octave;
                const note = event.note.number;
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
            })
        }
    }
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






// if (navigator.requestMIDIAccess) {
//     navigator.requestMIDIAccess({
//         sysex: false // this defaults to 'false' and we won't be covering sysex in this article. 
//     }).then(onMIDISuccess, onMIDIFailure);
//     console.log('Midi OK');
// } else {
//     console.log('Pas de Midi');
// }

// // midi functions
// function onMIDISuccess(midiAccess) {
//     // when we get a succesful response, run this code
//     midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status

//     var inputs = midi.inputs.values();
//     // loop over all available inputs and listen for any MIDI input
//     for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
//         // each time there is a midi message call the onMIDIMessage function
//         input.value.onmidimessage = onMIDIMessage;
//     }
// }

// function onMIDIFailure(error) {
//     // when we get a failed response, run this code
//     console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + error);
// }

// function onMIDIMessage(message) {
//     data = message; // this gives us our [command/channel, note, velocity] data.
//     console.log('MIDI data', data); // MIDI data [144, 63, 73]
// }