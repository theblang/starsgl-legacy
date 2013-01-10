starsgl.Galaxy = function() {
	this.JSON = null;
	this.systemContainer = new THREE.Object3D();
	this.activeSystemIndex = null;
};

starsgl.Galaxy.prototype.init = function(JSON) {
	this.JSON = JSON;
};

starsgl.Galaxy.prototype.setJSON = function(JSON) {
	this.JSON = JSON;
	this.activeSystemIndex = JSON.activeSystemIndex;
};