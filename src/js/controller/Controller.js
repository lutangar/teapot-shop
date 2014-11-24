/**
 * Controller
 * @param canvas3D
 * @param scene
 * @param model
 */
function Controller (canvas3D, scene, model) {
    // mandatory parameters
    this.canvas3D = canvas3D;
    this.scene    = scene;
    this.model    = model;
}
Controller.prototype = {};

/**
 * Initialise
 */
Controller.prototype.init = function () {
    /**
     * Set focus
     */
    this.camera = new Camera(70, this.canvas3D.getRatio(), 0.1, 80000);

    var light = new THREE.PointLight( 0xFFFFFF, 0.8 );
        light.color.setHSL(0.995, 0.025, 0.99);
        light.castShadow = true;
        light.position.set( 0, 0, 100 );

    var directionalLight = new THREE.DirectionalLight( 0xffeedd );

    this.camera.add(light);

    this.camera.position.copy(new THREE.Vector3(0, 2, -2));
    this.model.add(this.camera);
    this.controls = new THREE.TrackballControls(this.camera, this.canvas3D.renderer.domElement);

    /**
     * Events
     */
    this.canvas3D.addEventListener('canvas:resize', this.camera.resize.bind(this.camera));
};

/**
 * Animate
 */
Controller.prototype.animate = function () {
    requestAnimationFrame(this.animate.bind(this));

    this.render();
};

/**
 * Render a frame
 */
Controller.prototype.render = function () {
    var delta = null;

    if (this.clock) {
        delta = this.clock.getDelta();
    }

    if (this.tween) {
        this.tween.update();
    }

    // controls
    if (this.controls) {
        if (delta) {
            this.controls.update(delta);
        } else {
            this.controls.update();
        }
    }

    this.canvas3D.renderer.clear();
    this.canvas3D.renderer.render(
        this.scene,
        this.camera
    );

    if (this.stats) {
        this.stats.update();
    }
};
