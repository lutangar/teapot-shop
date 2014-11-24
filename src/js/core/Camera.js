/**
 * Just a camera
 * @constructor
 */
function Camera ( fov, aspect, near, far ) {
    THREE.PerspectiveCamera.call( this, fov, aspect, near, far );
    this.pullBack = new THREE.Vector3(-40, 20, -80);
    this.name = 'camera';
}
Camera.prototype = Object.create(THREE.PerspectiveCamera.prototype);

/**
 * Handy resize function
 * @param resizeEvent { 'width': 1024, 'height': 768, 'ratio': 4/3 }
 */
Camera.prototype.resize = function (resizeEvent) {
    resizeEvent = resizeEvent || {};
    this.aspect = resizeEvent.ratio ? resizeEvent.ratio : 1;

    this.updateProjectionMatrix();
};
