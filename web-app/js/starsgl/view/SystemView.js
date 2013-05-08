starsgl.SystemView = function(mainCanvas) {
	this.mainCanvas = mainCanvas;
	this.activeSystemName = mainCanvas.startingSystemName;
	this.JSON = null;
	this.objects = [];
};

starsgl.SystemView.prototype.draw = function() {
	var self = this;
	this.mainCanvas.clear();
	
	$.ajax({
		type: "GET",
		url: "/starsgl/system/getByName?name=" + self.activeSystemName,
		success: function(data, textStatus, jqXHR) {
			self.setJSON(data);
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
	var planetJSON = this.JSON.planets // TODO: change everything to use the planetJSON reference
	for(var i = 0; i < this.JSON.planets.length; i++) {
		if(i === 0) {
			geometry = new THREE.CubeGeometry(30, 30, 30);
			material = new THREE.MeshBasicMaterial({color: 0xFFCC33, wireframe: true});
			var starbase = new starsgl.Starbase(geometry, material);
			starbase.position.set(this.JSON.planets[i].x, this.JSON.planets[i].y + 200, this.JSON.planets[i].z);
			this.mainCanvas.scene.add(starbase);
		}
		
		geometry = new THREE.SphereGeometry(this.JSON.planets[i].radius, 10, 10);
		material = new THREE.MeshBasicMaterial({color: 0x66FF00, wireframe: true});
		var planet = new starsgl.Planet(geometry, material);
		planet.position.set(this.JSON.planets[i].x, this.JSON.planets[i].y, this.JSON.planets[i].z);
		this.mainCanvas.scene.add(planet);
		
		// orbits
		geometry = new THREE.Geometry();
		material = new THREE.LineBasicMaterial({color: 0xFFFFFF, opacity: 0.8});		
		var resolution = 100;
		var size = 360 / resolution;
		var segment = null;
		for(var j = 0; j <= resolution; j++) {
			segment = (j * size) * Math.PI / 180;
			geometry.vertices.push(new THREE.Vector3(Math.cos(segment) * this.JSON.planets[i].distanceFromSun, 0, Math.sin(segment) * this.JSON.planets[i].distanceFromSun));
		}
		var line = new THREE.Line(geometry, material);
		this.mainCanvas.scene.add(line);		
		
		// moons
		var moonJSON = this.JSON.planets[i].moons;
		for(var j = 0; j < moonJSON.length; j++) {
			geometry = new THREE.SphereGeometry(moonJSON[j].radius, 10, 10);
			material = new THREE.MeshBasicMaterial({color: 0xCCCCCC, wireframe: true});
			var moon = new starsgl.Moon(geometry, material);
			moon.position.set(moonJSON[j].x, moonJSON[j].y, moonJSON[j].z);	
			this.mainCanvas.scene.add(moon);
			
			// orbits
			geometry = new THREE.Geometry();
			material = new THREE.LineBasicMaterial({color: 0xFFFFFF, opacity: 0.8});		
			var resolution = 100;
			var size = 360 / resolution;
			var segment = null;
			for(var k = 0; k <= resolution; k++) {
				segment = (k * size) * Math.PI / 180;
				geometry.vertices.push(new THREE.Vector3(Math.cos(segment) * moonJSON[j].distanceFromPlanet, 0, Math.sin(segment) * moonJSON[j].distanceFromPlanet));
			}
			var line = new THREE.Line(geometry, material);
			line.translateX(planetJSON[i].x);
			line.translateY(planetJSON[i].y);
			line.translateZ(planetJSON[i].z);
			this.mainCanvas.scene.add(line);
		}
	}
};

starsgl.SystemView.prototype.setJSON = function(JSON) {
	this.JSON = JSON;
};

starsgl.SystemView.prototype.onMouseWheel = function() {
	$("#planet-info").fadeOut("slow");
}