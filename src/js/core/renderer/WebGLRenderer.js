/**
 * WebGLRenderer
 *
 * @author lutangar https://github.com/lutangar
 */
function WebGLRenderer (parameters) {
    parameters = parameters || {
        antialias: true,
        alpha: true,
        gammaInput: true,
        gammaOutput: true,
        physicallyBasedShading: true
    };
    THREE.WebGLRenderer.call( this, parameters );
}

WebGLRenderer.prototype = Object.create( THREE.WebGLRenderer.prototype );

/**
 * Resize method
 * events ready
 * @param size { 'width': 1280, 'height': 1024 }
 */
WebGLRenderer.prototype.resize = function (size) {
    this.setSize(
        size.width,
        size.height
    );
};

THREE.EventDispatcher.prototype.apply( WebGLRenderer.prototype );
