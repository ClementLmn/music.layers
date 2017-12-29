import Tone from 'Tone';
import metroSample from './sample/metronome.mp3';
import metroSampleUp from './sample/metronomeUp.mp3';

export const initRec = () => {
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

    const loopRec = () => {
        isRec = true;
        recButton.classList.add('active');
        const thisLoopNb = currentLoopNb++;
        whichMetro = 1;
        Tone.Transport.position = "0:0:0";
        metronome.mute = false;
        
        Tone.Transport.on("loop", function(time){
            if(isRec){
                console.log('STOOOOP')
                loopStopRec();
            }
        });

        // var part = new Tone.Part(function(time, value){
        //     //the value is an object which contains both the note and the velocity
        //     synth.triggerAttackRelease(value.note, "8n", time, value.velocity);
        // }, [{"time" : 0, "note" : "C3", "velocity": 0.9}, 
        //        {"time" : "0:2", "note" : "C4", "velocity": 0.5}
        // ]).start(0);
    }

    const loopStopRec = (note, frequency) => {
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
export const loopPlay = (note, frequency) => {
    var part = new Tone.Part(function(time, value){
        //the value is an object which contains both the note and the velocity
        synth.triggerAttackRelease(value.note, "8n", time, value.velocity);
    }, [
        {"time" : 0, "note" : "C3", "velocity": 0.9}, 
        {"time" : "0:2", "note" : "C4", "velocity": 0.5}
    ]).start(0);
}