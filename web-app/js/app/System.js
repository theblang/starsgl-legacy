starsgl.System = function(scene) {
	this.scene = scene;
	this.JSON = null;
	this.planetContainer = new THREE.Object3D();
	this.orbitContainer = new THREE.Object3D();
	this.objects = [];
};

starsgl.System.prototype.init = function() {
	
};

starsgl.System.prototype.setJSON = function(JSON) {
	this.JSON = JSON;
};

starsgl.System.prototype.createOrbit = function(amplitude) {
	var resolution = 100;
	var size = 360 / resolution;
	
	var geometry = new THREE.Geometry();
	var material = new THREE.LineBasicMaterial({color: 0xFFFFFF, opacity: 0.8});
	
	var segment = null;
	for(var i = 0; i <= resolution; i++) {
		segment = (i * size) * Math.PI / 180;
		geometry.vertices.push(new THREE.Vector3(Math.cos(segment) * amplitude, 0, Math.sin(segment) * amplitude));
	}
	
	var line = new THREE.Line(geometry, material);
	
	return line;
};