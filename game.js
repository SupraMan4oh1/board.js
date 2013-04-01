requirejs.config({
    shim: {
        "lib/three" : {
            exports: "THREE"
        },
        "lib/stats" : {
            exports: "Stats"
        }
    }
});

require(["board", "boardgame", "lib/three"], function(Board, BoardGame, THREE) {
    var color = 0x00cc00;
    var arc = 0;
    var stage = new BoardGame({
        init : function(scene) {
            for(var x=-45; x < 55; x += 10) {
                for (var z = -45; z < 55; z += 10) {
                    var board = Board.create({
                        color: color,
                        width: 9,
                        height: 9
                    });
                    board.position.x = x;
                    board.position.z = z;
                    scene.add(board);
                    color = 0x0000cc;
                }
                color = 0xcc0000;
            }
        },
        update: function(dt, camera) {
            arc += dt*.0001;
            camera.position.x = Math.cos(arc)*120;
            camera.position.z = Math.sin(arc)*120;
            camera.lookAt(new THREE.Vector3(0,0,0));
           return true;
        }
    }, true);
});

