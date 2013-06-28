starsgl.Moon = function(geometry, material) {
	THREE.Mesh.call(this);
	
	this.geometry = geometry;
	this.material = material;
};

starsgl.Moon.prototype = Object.create(THREE.Mesh.prototype);

