import Tone from 'Tone';
import Audiokeys from 'audiokeys'
import {notePlay, noteStop} from './voices';


const tremolo = new Tone.Tremolo(0,0.75).toMaster();
const ppDelay = new Tone.PingPongDelay(0,0.75).toMaster();
const reverb = new Tone.Freeverb(0.85, 3000).toMaster();
let tremoloActive;
export const synth = new Tone.PolySynth(3).connect(tremolo).connect(ppDelay).connect(reverb);

var keyboard = new AudioKeys();

keyboard.down( function(note) {
    const fullNote = event.note.name + event.note.octave;
    synth.triggerAttack(fullNote);
    notePlay(event.note.number);
});

keyboard.up( function(note) {
    synth.triggerRelease(event.note.name + event.note.octave);
    noteStop(event.note.number);
});