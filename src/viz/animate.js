import fieldSorter from '../utils/fieldSorter.js';
import * as CCapture from 'ccapture.js';
import {getVoices, deleteVoice} from '../sound/voices';

export default (scene, camera, renderer, stats, isRecorded = false) => {
    if(isRecorded){
        const capturer = new CCapture( { format: 'png', verbose: true, startTime: 1, timeLimit: 6 } );
        capturer.start();
    }
    const voices = getVoices(scene);
    let count = 0;
    const animate = timestamp => {
        stats.begin();
        renderer.render(scene, camera);
        for (var prop in voices) {
            voices[prop].material.uniforms.count.value++;
        }
        if(isRecorded){
            capturer.capture( renderer.domElement );
        }
        stats.end();
        requestAnimationFrame(animate);
    }
    animate();    
}

