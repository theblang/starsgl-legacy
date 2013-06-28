starsgl.Ship = function(geometry, material) {
	THREE.Mesh.call(this, geometry, material);
};

starsgl.Ship.prototype = Object.create(THREE.Mesh.prototype);