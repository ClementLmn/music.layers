export default (scene, camera, renderer, stats, line) => {
    let count = 0;
    const speed = 4;
    const ampl = 2;
    const animate = timestamp => {
        stats.begin();
        renderer.render(scene, camera);
        count++;

        function fieldSorter(fields) {
            return (a, b) => fields.map(o => {
                let dir = 1;
                if (o[0] === '-') { dir = -1; o=o.substring(1); }
                return a[o] > b[o] ? dir : a[o] < b[o] ? -(dir) : 0;
            }).reduce((p,n) => p ? p : n, 0);
        }

        line.geometry.vertices.sort(fieldSorter(['x', 'y']));
        line2.geometry.vertices.sort(fieldSorter(['x', 'y']));


        for (let i = 0; i < line.geometry.vertices.length; i++){
            if (i%4 === 0){
                const v = line.geometry.vertices;
                v[i].y = ampl * Math.sin( 0.05 * (i + count * speed));
                v[i+1].y = ampl * Math.sin( 0.05 * (i + count * speed));
                v[i+2].y = ampl * Math.sin( 0.05 * (i + count * speed)) - 8;
                v[i+3].y = ampl * Math.sin( 0.05 * (i + count * speed)) - 8;
            }
        }
        line.geometry.verticesNeedUpdate = true;

        for (let j = 0; j < line.geometry.vertices.length; j++){
            if (j%4 === 0){
                const v = line.geometry.vertices;
                v[j].y = ampl * Math.sin( 0.05 * (j + count * speed));
                v[j+1].y = ampl * Math.sin( 0.05 * (j + count * speed));
                v[j+2].y = ampl * Math.sin( 0.05 * (j + count * speed)) - 8;
                v[j+3].y = ampl * Math.sin( 0.05 * (j + count * speed)) - 8;
            }
        }

        
        line2.geometry.verticesNeedUpdate = true;
        stats.end();
        requestAnimationFrame(animate);
    }
    animate();    
}

