starsgl.ManufacturingView = function(manufacturingCanvas) {
	this.manufacturingCanvas = manufacturingCanvas;
	this.object = null;
};

starsgl.ManufacturingView.prototype.draw = function() {
	this.manufacturingCanvas.clear();

	this.manufacturingCanvas.camera.position.z = 400;
	
	var geometry = new THREE.CubeGeometry(100, 100, 100);
	var material = new THREE.MeshBasicMaterial({color: 0xFFCC33, wireframe: true});
	var starbase = new starsgl.Starbase(geometry, material);
	starbase.position.set(0, 0, 0);
	this.manufacturingCanvas.scene.add(starbase);	
	this.object = starbase;
};

starsgl.ManufacturingView.prototype.setJSON = function(JSON) {
};