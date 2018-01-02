import Tone from 'Tone';
import metroSample from './sample/metronome.mp3';
import metroSampleUp from './sample/metronomeUp.mp3';
import {notePlay, noteStop} from './voices';
import * as key from './keyboard';

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

    const processData = data => {
        data.notes.forEach(el => {
            if(el.timeEnd == undefined) el.timeEnd = "8m";
            el.deltaTime = el.timeEnd - el.time;
        });
        console.log(data)
        const part = new Tone.Part(function(time, value){
            data.sound.triggerAttackRelease(value.note, value.deltaTime, time);
            if(data.sound == synth){
                notePlay(Tone.Frequency(value.note).toMidi(), Tone.Frequency(value.note).toFrequency());
                setTimeout(() => {
                    noteStop(Tone.Frequency(value.note).toMidi(), Tone.Frequency(value.note).toFrequency());
                }, Tone.Time(value.deltaTime).toMilliseconds());
            }
        }, data.notes).start(0);
    }

    const loopRec = () => {
        isRec = true;
        recButton.classList.add('active');
        const thisLoopNb = currentLoopNb++;
        whichMetro = 1;
        Tone.Transport.position = "0:0:0";
        metronome.mute = false;


        key.rec();
        
        Tone.Transport.on("loop", function(time){
            if(isRec) loopStopRec();
        });
    }



    const loopStopRec = (note, frequency) => {
        key.stopRec()

        processData(key.dataRecorded());

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

}