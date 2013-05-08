starsgl.GalaxyView = function(mainCanvas) {
	this.mainCanvas = mainCanvas;
	this.activeSystem = null;
	this.JSON = null;
};

starsgl.GalaxyView.prototype.draw = function() {
	var self = this;
	this.mainCanvas.clear();
	
	// get galaxy information
	$.ajax({
		type: "POST",
		url: "/starsgl/galaxy/getByName?name=main",
		success: function(data, textStatus, jqXHR) {
			self.setJSON(data);
		},
		async: false
	});		
	
	for(var i = 0; i < this.JSON.systems.length; i++) {
		var geometry = new THREE.TetrahedronGeometry(40, 0);
		var material = new THREE.MeshBasicMaterial({color: 0xFFCC33, wireframe:true});
		var system = new starsgl.System(geometry, material);
		system.position.set(this.JSON.systems[i].x, this.JSON.systems[i].y, this.JSON.systems[i].z);
		system.name = this.JSON.systems[i].name;
		this.mainCanvas.scene.add(system);
		
		
//		var geometry = new THREE.SphereGeometry(starsgl.SYSTEM_RADIUS, 10, 10);
//		var material = new THREE.MeshBasicMaterial({color: 0xFFCC33, wireframe: true});
//		var system = new starsgl.System(geometry, material);
//		system.position.set(this.JSON.systems[i].x, this.JSON.systems[i].y, this.JSON.systems[i].z);
//		system.name = this.JSON.systems[i].name;
//		this.mainCanvas.scene.add(system);
	}
};

starsgl.GalaxyView.prototype.setJSON = function(JSON) {
	this.JSON = JSON;
};

starsgl.GalaxyView.prototype.onMouseMove = function(event) {
	
};