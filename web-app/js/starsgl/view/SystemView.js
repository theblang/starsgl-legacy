starsgl.SystemView = function(mainCanvas) {
	this.mainCanvas = mainCanvas;
	
	this.JSON = null;
	this.objects = [];
};

starsgl.SystemView.prototype.draw = function() {
	this.mainCanvas.clear();
	
	var that = this;
	$.ajax({
		type: "GET",
		url: "/starsgl/system/generateSystem",
		success: function(data, textStatus, jqXHR) {
			that.setJSON(data);
		},
		async: false
	});	
	
	this.mainCanvas.camera.position.set(starsgl.SYSTEM_CAMERA_START_X, starsgl.SYSTEM_CAMERA_START_Y, starsgl.SYSTEM_CAMERA_START_Z);
	this.mainCanvas.controls.center.set(0, 0, 0);
	
	// sun
	var geometry = new THREE.SphereGeometry(100, 10, 10);
	var material = new THREE.MeshBasicMaterial({color: 0xFFCC33, wireframe: true});
	var sun = new starsgl.Sun(geometry, material);
	sun.position.set(0, 0, 0);
	this.mainCanvas.scene.add(sun);
	
	// planets
	for(var i = 0; i < this.JSON.length; i++) {
		if(i === 0) {
			geometry = new THREE.CubeGeometry(30, 30, 30);
			material = new THREE.MeshBasicMaterial({color: 0xFFCC33, wireframe: true});
			var starbase = new starsgl.Starbase(geometry, material);
			starbase.position.set(this.JSON[i].position.x, this.JSON[i].position.y + 200, this.JSON[i].position.z);
			this.mainCanvas.scene.add(starbase);
		}
		
		geometry = new THREE.SphereGeometry(this.JSON[i].radius, 10, 10);
		material = new THREE.MeshBasicMaterial({color: 0x66FF00, wireframe: true});
		var planet = new starsgl.Planet(geometry, material);
		planet.position.set(this.JSON[i].position.x, this.JSON[i].position.y, this.JSON[i].position.z);
		this.mainCanvas.scene.add(planet);
		
		// orbits
		geometry = new THREE.Geometry();
		material = new THREE.LineBasicMaterial({color: 0xFFFFFF, opacity: 0.8});		
		var resolution = 100;
		var size = 360 / resolution;
		var segment = null;
		for(var j = 0; j <= resolution; j++) {
			segment = (j * size) * Math.PI / 180;
			geometry.vertices.push(new THREE.Vector3(Math.cos(segment) * this.JSON[i].distanceFromSun, 0, Math.sin(segment) * this.JSON[i].distanceFromSun));
		}
		var line = new THREE.Line(geometry, material);
		this.mainCanvas.scene.add(line);		
		
		// moons
		for(var j = 0; j < this.JSON[i].moons.length; j++) {
			var translation = new THREE.Vector3(this.JSON[i].position.x, this.JSON[i].position.y, this.JSON[i].position.z);
			geometry = new THREE.SphereGeometry(this.JSON[i].moons[j].radius, 10, 10);
			material = new THREE.MeshBasicMaterial({color: 0xCCCCCC, wireframe: true});
			var moon = new starsgl.Moon(geometry, material);
			moon.position.set(this.JSON[i].moons[j].position.x, this.JSON[i].moons[j].position.y, this.JSON[i].moons[j].position.z);	
			moon.translateX(translation.x);
			moon.translateY(translation.y);
			moon.translateZ(translation.z);	
			this.mainCanvas.scene.add(moon);
		}
	}
};

starsgl.SystemView.prototype.setJSON = function(JSON) {
	this.JSON = JSON;
};

starsgl.SystemView.prototype.onMouseWheel = function() {
	$("#planet-info").fadeOut("slow");
}