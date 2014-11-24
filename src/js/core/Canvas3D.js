/**
 * Canvas 3D
 * @param selector
 * @param renderer
 */
function Canvas3D (selector, renderer) {
    selector = selector || '#container';
    renderer = renderer || new WebGLRenderer();

    // container
    this.container = document.querySelector(selector);

    // canvas current width
    this.width = this.getWidth();

    // canvas current height
    this.height = this.getHeight();

    // WebGL renderer
    this.renderer = renderer;
    this.renderer.setSize(this.width, this.height);
    this.renderer.autoClear = false;

    // append canvas itself
    this.container.appendChild(this.renderer.domElement);

    // global resize listener
    window.addEventListener('resize', this.resize.bind(this), false);

    // canvas resize listener for renderer
    this.addEventListener('canvas:resize', this.renderer.resize.bind(this.renderer));
}
Canvas3D.prototype = {};

/**
 * Get canvas current width
 * @returns {number}
 */
Canvas3D.prototype.getWidth = function () {
    return this.container.offsetWidth;
};

/**
 * Get canvas current height
 * @returns {number}
 */
Canvas3D.prototype.getHeight = function () {
    var style = window.getComputedStyle(this.container, null);
    var paddingTop      = style.getPropertyValue('padding-top').replace('px', '');
    var paddingBottom   = style.getPropertyValue('padding-bottom').replace('px', '');
    var marginBottom    = style.getPropertyValue('margin-bottom').replace('px', '');

    return window.innerHeight -
        this.getOffsetTop() -
        parseInt(paddingTop ? paddingTop : 0) -
        parseInt(paddingBottom ? paddingBottom : 0) -
        parseInt(marginBottom ? marginBottom : 0) -
        10;
};

/**
 * Get top offset
 * @returns {number}
 */
Canvas3D.prototype.getOffsetTop = function () {
    var boxTop = this.container.getBoundingClientRect().top,
        scrollTop = window.pageYOffset || document.body.scrollTop,
        clientTop = document.documentElement.clientTop;

    return boxTop + scrollTop - clientTop;
};

/**
 * Get left offset
 * @returns {number}
 */
Canvas3D.prototype.getOffsetLeft = function () {
    var boxLeft = this.container.getBoundingClientRect().left,
        scrollLeft = window.pageXOffset || document.body.scrollLeft,
        clientLeft = document.documentElement.clientLeft;

    return boxLeft + scrollLeft - clientLeft;
};

/**
 * Get width/height ratio
 * @returns {number}
 */
Canvas3D.prototype.getRatio = function () {
    return this.getWidth() / this.getHeight();
};

/**
 * Resize
 */
Canvas3D.prototype.resize = function (e) {
    this.dispatchEvent({
        type: 'canvas:resize',
        width: this.getWidth(),
        height: this.getHeight(),
        offsetLeft: this.getOffsetLeft(),
        offsetTop: this.getOffsetTop(),
        ratio: this.getRatio()
    });
};

THREE.EventDispatcher.prototype.apply( Canvas3D.prototype );
