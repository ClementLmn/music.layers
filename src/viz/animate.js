import fieldSorter from '../utils/fieldSorter.js';
import * as CCapture from '../utils/Ccapture';
import {getVoices} from '../sound/voices';

export default (scene, camera, renderer, stats) => {
    const voices = getVoices(scene);
    const capturer = new CCapture( { format: 'png', verbose: true } );
    let count = 0;
    const animate = timestamp => {
        stats.begin();
        renderer.render(scene, camera);
        count++;
        const moveLine = (v) => {
            const geo = v.mesh.geometry;
            for (let i = 0; i < geo.vertices.length; i++){
                if (i%4 === 0){
                    const vtx = geo.vertices;
                    vtx[i].y = v.ampl * Math.sin( v.freq * (i + count * v.speed)) - 8;
                    vtx[i+1].y = v.ampl * Math.sin( v.freq * (i + count * v.speed)) - 8;
                    vtx[i+2].y = v.ampl * Math.sin( v.freq * (i + count * v.speed));
                    vtx[i+3].y = v.ampl * Math.sin( v.freq * (i + count * v.speed));
                }
            }
            geo.verticesNeedUpdate = true;
        }

        voices.forEach((v) => {
            v.mesh.geometry.vertices.sort(fieldSorter(['x', 'y']));
            moveLine(v);
        }, this);
        capturer.capture( renderer.domElement );
        if(count === 300){
            capturer.stop();
            capturer.save();
        }
        stats.end();
        requestAnimationFrame(animate);
    }
    animate();    
}

