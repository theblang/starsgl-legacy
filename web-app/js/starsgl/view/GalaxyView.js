starsgl.GalaxyView = function(mainCanvas) {
	this.mainCanvas = mainCanvas;
	
	this.activeSystem = null;
	this.JSON = null;
	
};

starsgl.GalaxyView.prototype.draw = function() {
	this.mainCanvas.clear();
	
	var that = this;
	$.ajax({
		type: "GET",
		url: "/starsgl/galaxy/generateGalaxy",
		success: function(data, textStatus, jqXHR) {
			that.setJSON(data);
		},
		async: false
	});	

	this.mainCanvas.camera.position.set(500, 500, 500);
	this.mainCanvas.controls.center.set(0, 0, 0);
	
	for(var i = 0; i < this.JSON.systems.length; i++) {
		var geometry = new THREE.SphereGeometry(starsgl.SYSTEM_RADIUS, 10, 10);
		var material = new THREE.MeshBasicMaterial({color: 0xFFCC33, wireframe: true});
		var system = new starsgl.System(geometry, material);
		system.position.set(this.JSON.systems[i].position.x, this.JSON.systems[i].position.y, this.JSON.systems[i].position.z);
		this.mainCanvas.scene.add(system);
	}
};

starsgl.GalaxyView.prototype.setJSON = function(JSON) {
	this.JSON = JSON;
};