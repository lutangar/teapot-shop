/**
 * Controls with canvas resize
 * @author lutangar https://github.com/lutangar
 */
Controls  = function (camera, canvas3D) {
    THREE.TrackballControls.call( this, camera, canvas3D.renderer.domElement);

    this.target.set( 0, 0, 0 );
    this.rotateSpeed = 1.0;
    this.zoomSpeed = 1.2;
    this.panSpeed = 0.2;
    this.noZoom = false;
    this.noPan = true;
    this.staticMoving = false;
    this.dynamicDampingFactor = 0.3;
    this.minDistance = 1.1;
    this.maxDistance = 900;
    this.keys = [ 65, 83, 68 ]; // [ rotateKey, zoomKey, panKey ]

    this.screen = {
        width: canvas3D.getWidth(),
        height: canvas3D.getHeight(),
        offsetLeft: canvas3D.getOffsetLeft(),
        offsetTop: canvas3D.getOffsetTop()
    };
    this.radius = ( this.screen.width + this.screen.height ) / 4;

    /**
     * Handy resize method
     * @param size { 'width': 1280, 'height': 1024 }
     */
    this.resize = function (size) {
        this.screen.width      = size.width || window.innerWidth;
        this.screen.height     = size.height || window.innerHeight;
        this.screen.offsetLeft = size.offsetLeft || 0;
        this.screen.offsetTop  = size.offsetTop || 0;

        this.radius = ( this.screen.width + this.screen.height ) / 4;
    };
    canvas3D.addEventListener('canvas:resize', this.resize.bind(this));
};

Controls.prototype = Object.create( THREE.TrackballControls.prototype );
THREE.EventDispatcher.prototype.apply( Controls.prototype );
