starsgl.Starbase = function(geometry, material) {
	THREE.Mesh.call(this, geometry, material);

	this.geometry = geometry;
	this.material = material;
};

starsgl.Starbase.prototype = Object.create(THREE.Mesh.prototype);

starsgl.Starbase.prototype.onDblClick = function() {		
};

starsgl.Starbase.prototype.unFocus = function() {
};

