import Tone from 'Tone';
import WebMidi from 'webmidi';
import {notePlay, noteStop} from './voices';


const tremolo = new Tone.Tremolo(0,0.75).toMaster();
const ppDelay = new Tone.PingPongDelay(0,0.75).toMaster();
const reverb = new Tone.Freeverb(0.85, 3000).toMaster();
let tremoloActive;
export const synth = new Tone.PolySynth(3).connect(tremolo).connect(ppDelay).connect(reverb);
let midi, data, midiEnable;


export const initMidi = () => {
    WebMidi.enable((err) => {
        console.log(err);
        if (!err){
            midiEnable = true
            if (WebMidi.inputs){
                WebMidi.inputs.forEach((input) => bindInput(input))
            }
        }
    });    
}

const bindInput = inputDevice => {
    if (midiEnable){
        WebMidi.addListener('disconnected', (device) => {
            if (device.input){
                device.input.removeListener('noteOn')
                device.input.removeListener('noteOff')
            }
        })
        inputDevice.addListener('controlchange', 'all', (event) => {
            if (event.data[1] === 48){
                if (tremolo.frequency.value == 0){
                    tremoloActive = false;
                    tremolo.stop();
                } 
                else if(!tremoloActive){
                    tremoloActive = true;
                    tremolo.start();
                }
                tremolo.frequency.value = event.data[2] * 25 / 127;
            }
            if (event.data[1] === 49){
                ppDelay.delayTime.value = event.data[2] / 127;
            }
            if (event.data[1] === 52){
                reverb.wet.value = event.data[2] / 127;
            }
        })
        inputDevice.addListener('noteon', 'all', (event) => {
            const fullNote = event.note.name + event.note.octave;
            const note = event.note.number;
            synth.triggerAttack(fullNote);
            const frequency = Tone.Frequency().midiToFrequency(note);
            notePlay(note, frequency);

        })
        inputDevice.addListener('noteoff', 'all',  (event) => {
            const fullNote = event.note.name + event.note.octave;
            const note = event.note.number;
            synth.triggerRelease(fullNote);
            const frequency = Tone.Frequency().midiToFrequency(note);
            noteStop(note, frequency);
        })
    }
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