define(['lib/three'], function(THREE) {
    return {
        create: function(settings) {
            var board = new THREE.Mesh(
                new THREE.CubeGeometry( settings.width, 1, settings.height),
                new THREE.MeshLambertMaterial({color: settings.color})
            );
            return board;
        }
    };
});
