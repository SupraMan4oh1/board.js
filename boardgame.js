define(['lib/three', 'lib/stats'], function(THREE, Stats) {
    "use strict";
    
    var SCREEN_WIDTH = window.innerWidth,
        SCREEN_HEIGHT = window.innerHeight,
        SCREEN_WIDTH_HALF = SCREEN_WIDTH  / 2,
        SCREEN_HEIGHT_HALF = SCREEN_HEIGHT / 2;

    // set some camera attributes
    var VIEW_ANGLE = 40,
        NEAR = .1,
        ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
        FAR = 10000;

    // get the DOM element to attach to
    var $container = document.getElementById('container');

    // create a WebGL renderer, camera
    // and a scene
    var renderer;
    if(window.WebGLRenderingContext) {
        renderer = new THREE.WebGLRenderer();
    }
    else {
        renderer = new THREE.CanvasRenderer();
    }

    var camera = new THREE.PerspectiveCamera(
            VIEW_ANGLE,
            ASPECT,
            NEAR,
            FAR);

    camera.position.x = 120;
    camera.position.y = 120;
    camera.position.z = 120;
    camera.lookAt(new THREE.Vector3(0,0,0));


    var scene = new THREE.Scene();

    // add the camera to the scene
    scene.add(camera);


    // start the renderer
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

    // attach the render-supplied DOM element
    $container.appendChild(renderer.domElement);

    var stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    $container.appendChild(stats.domElement);

    var light = new THREE.PointLight(0xffffff);
    light.position.y = 200;
    scene.add(light);

    function resize() {
        var SCREEN_WIDTH = window.innerWidth,
            SCREEN_HEIGHT = window.innerHeight,
            SCREEN_WIDTH_HALF = SCREEN_WIDTH  / 2,
            SCREEN_HEIGHT_HALF = SCREEN_HEIGHT / 2;
        camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
        camera.updateProjectionMatrix();
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    }

    window.addEventListener('resize', resize, false);
    resize();

    return function(stage, debug) {
        stage.init(scene);
        renderer.render(scene, camera);

        var lastTime = 0;
        function animate( time ) {
            var dt = (lastTime == 0 ? 0 : time - lastTime);
            requestAnimationFrame(animate);
            if(stage.update(dt, camera)) {
                renderer.render(scene, camera);
            }
            if (debug) stats.update();
            lastTime = time;
        }
        animate( 0 );
    };
});

