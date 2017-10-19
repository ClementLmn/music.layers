export default (scene, camera, renderer, stats, lines) => {
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

        const moveLine = (l) => {
            for (let i = 0; i < l.geometry.vertices.length; i++){
                if (i%4 === 0){
                    const v = l.geometry.vertices;
                    v[i].y = ampl * Math.sin( 0.05 * (i + count * speed)) - 8;
                    v[i+1].y = ampl * Math.sin( 0.05 * (i + count * speed)) - 8;
                    v[i+2].y = ampl * Math.sin( 0.05 * (i + count * speed));
                    v[i+3].y = ampl * Math.sin( 0.05 * (i + count * speed));
                }
            }
            l.geometry.verticesNeedUpdate = true;
        }

        lines.forEach((e) => {
            e.geometry.vertices.sort(fieldSorter(['x', 'y']));
            moveLine(e);
        }, this);

        
        stats.end();
        requestAnimationFrame(animate);
    }
    animate();    
}

