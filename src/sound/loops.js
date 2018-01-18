import Tone from 'Tone';
import metroSample from './sample/metronome.mp3';
import metroSampleUp from './sample/metronomeUp.mp3';
import * as key from './keyboard';
import * as midi from './midiSound';
import Loop from './Loop';
import Line from '../viz/Line';
import {scene} from '../viz/sceneInit';
import { TweenMax } from 'gsap';

const loopsArray = {};
let lastLines = {};
let loopNb = 0;
let loopSNb= 0;

export const initRec = synth => {
    

    let currentLoopNb = 0;
    let isRec = false;
    const recButton = document.querySelector('#rec');
    const metro = new Tone.Sampler({
        "C4" : metroSample,
        "C5" : metroSampleUp
    }).toMaster();

    let whichMetro = 1;

    const metronome = new Tone.Loop(function(time){
        whichMetro = whichMetro > 4 ? 1 : whichMetro;
        whichMetro == 1 ? metro.triggerAttack("C5") : metro.triggerAttack("C4");
        whichMetro++;
        
    }, "4n").start(0);

    metronome.mute = true;

    const processData = (data) => {
        data.notes.forEach(el => {
            if(el.timeEnd == undefined) el.timeEnd = "4m";
            el.deltaTime = el.timeEnd - el.time;
        });
        
        if(data.sound == synth) loopSNb++;
        loopNb++;
        loopsArray[loopNb] = new Loop(loopNb, loopSNb, data.sound, data.notes, synth);
    }

    const loopRec = () => {
        isRec = true;
        recButton.classList.add('active');
        const thisLoopNb = currentLoopNb++;
        whichMetro = 1;
        Tone.Transport.position = "0:0:0";
        metronome.mute = false;


        key.rec();
        midi.rec();
        
        Tone.Transport.on("loop", function(time){
            if(isRec) loopStopRec();
        });
    }



    const loopStopRec = (note, frequency) => {
        key.stopRec()
        midi.stopRec()
        

        if(key.dataRecorded().notes.length > 0){
            processData(key.dataRecorded());
        }
        if(midi.dataRecorded().notes.length > 0){
            processData(midi.dataRecorded());
        }
        

        isRec = false;
        recButton.classList.remove('active');
        Tone.Transport.position = "0:0:0";
        metronome.mute = true;

    }


    recButton.addEventListener('click', function(){
        if(!isRec){
            loopRec();
        }else{
            loopStopRec();
        }
    });


}

export const getLoops = () => {
    return loopsArray;
}