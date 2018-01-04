import fieldSorter from '../utils/fieldSorter.js';
import * as CCapture from 'ccapture.js';
import {getVoices} from '../sound/voices';
import {getLoops} from '../sound/loops';

export default (scene, camera, renderer, stats, isRecorded = false) => {
    if(isRecorded){
        const capturer = new CCapture( { format: 'png', verbose: true, startTime: 1, timeLimit: 6 } );
        capturer.start();
    }
    const voices = getVoices();
    const loops = getLoops();
    let count = 0;
    const animate = timestamp => {
        stats.begin();
        renderer.render(scene, camera);
        for (var prop in voices) {
            voices[prop].material.uniforms.count.value++;
        }

        for (var prop in loops) {
            if(!loops[props].dead) loops[prop].animate();
        }
        
        if(isRecorded){
            capturer.capture( renderer.domElement );
        }
        stats.end();
        requestAnimationFrame(animate);
    }
    animate();    
}

