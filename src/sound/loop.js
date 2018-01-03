import Tone from 'Tone';
import Line from '../viz/Line';
import {scene} from '../viz/sceneInit';
import { TweenMax } from 'gsap';

class Loop{
    constructor(id, sound, notes, synth){
        this.id = id;
        this.sound = sound;
        this.notes = notes;
        this.synth = synth;

        this.dead = false;

        this.voices = {};
        this.lastLine;

        this.notePlay = this.notePlay.bind(this)
        this.noteStop = this.noteStop.bind(this)
        this.animate = this.animate.bind(this)
        this.html = `<span class='loop' id='loop${this.id}'><span class='number'>${this.id}</span><span class='mute'>mute</span><span class='delete'>delete</span></span>`;

        const noteS = this.noteStop;
        const noteP = this.notePlay;

        function trigger(time, value){
            this.sound.triggerAttackRelease(value.note, value.deltaTime, time);

            if(this.sound == this.synth){

                noteP(this.id, Tone.Frequency(value.note).toMidi(), Tone.Frequency(value.note).toFrequency());

                setTimeout(() => {
                    noteS(this.id, Tone.Frequency(value.note).toMidi(), Tone.Frequency(value.note).toFrequency());
                }, Tone.Time(value.deltaTime).toMilliseconds());

            }
        }
        
        function onClickMute(){
            this.part.mute = !this.part.mute;
            document.querySelector(`#loop${this.id} .mute`).classList.toggle('active');
        }
        function onClickDelete(){
            this.part.removeAll();
            document.querySelector(`#loop${this.id}`).remove();
            this.dead = true;
        }

        this.part = new Tone.Part(trigger.bind(this), this.notes).start(0);
        
        
        document.querySelector('#loopList').insertAdjacentHTML("afterBegin",this.html);

        document.querySelector(`#loop${this.id} .mute`).addEventListener('click', onClickMute.bind(this));
        document.querySelector(`#loop${this.id} .delete`).addEventListener('click', onClickDelete.bind(this));


    }
    
    notePlay(loopNumber, note, frequency) {
        let thisLine;
        
        if(Object.keys(this.voices).length > 0){
            thisLine = new Line(note, this.voices, 2, (frequency).toFixed(2), 4, this.lastLine.place + 1, loopNumber*20);
        }else{
            thisLine = new Line(note, this.voices, 2, (frequency).toFixed(2), 4, 0, loopNumber*20);
        }

        this.voices[note] = thisLine;
        this.lastLine = thisLine;
        scene.add(thisLine.mesh);
        console.log(this)
    }
    
    noteStop(loopNumber, note, frequency) {
        // on enleve la note du tableau mais on la garde
        let noteToKill = this.voices[note];
        delete this.voices[note];
    
        TweenMax.to(noteToKill.mesh.scale, 0.3, {x :0.001, onComplete: function(){
            scene.remove(noteToKill.mesh);
            noteToKill = null;
            // on dégage celle quon a gardé
        }});
    }

    animate(){
        for (var prop in this.voices) {
            this.voices[prop].material.uniforms.count.value++;
        }
    }
}

export default Loop;