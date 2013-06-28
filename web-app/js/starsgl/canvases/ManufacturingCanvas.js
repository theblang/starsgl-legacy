starsgl.ManufacturingCanvas = function() {	
	var width = $("#manufacturing-canvas").width();
	var height = $("#manufacturing-canvas").height();
	
	// initialize three.js 
	this.container = document.getElementById("manufacturing-canvas");
	this.scene = new THREE.Scene();
	
	this.renderer = new THREE.WebGLRenderer({antialias: true});
	this.renderer.setSize(width, height);
	this.container.appendChild(this.renderer.domElement);
	
	this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 20000);
	this.camera.position.set(0, 0, 0);
	
	this.projector = new THREE.Projector();
	this.clock = new THREE.Clock();
	
	THREEx.WindowResize(this.renderer, this.camera);	
	
	// initialize manufacturing view
	this.manufacturingView = new starsgl.ManufacturingView(this);	
	
	// draw manufacturing view
	this.manufacturingView.draw();
	
	// start rendering loop
	this.animate();
};

starsgl.ManufacturingCanvas.prototype.animate = function() {
	requestAnimationFrame(this.animate.bind(this));
	this.render();
	this.update();
};

starsgl.ManufacturingCanvas.prototype.render = function() {
	this.renderer.render(this.scene, this.camera);
};

starsgl.ManufacturingCanvas.prototype.update = function() {
	var delta = this.clock.getDelta();
	
	this.manufacturingView.object.rotation.y -= delta;
};

starsgl.ManufacturingCanvas.prototype.clear = function() {
	// reference: http://stackoverflow.com/questions/11678497/cant-remove-objects-using-three-js
	var obj, i;
	for(i = this.scene.children.length - 1; i >= 0; i--) {
		obj = this.scene.children[i];
		this.scene.remove(obj);
	}
};

starsgl.ManufacturingCanvas.prototype.onDblClick = function(event) {	
};

starsgl.ManufacturingCanvas.prototype.onContextMenu = function(event) {	
};

starsgl.ManufacturingCanvas.prototype.onKeyup = function(event) {	
};