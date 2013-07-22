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
	
	// reusable objects
	var texture;
	var geometry;
	var material;
	var light;
	
	// model loader
	var loader = new THREE.JSONLoader();
	
	// sun
	var geometry = new THREE.SphereGeometry(100, 10, 10);
	var material = new THREE.MeshBasicMaterial({color: 0xFFCC33, wireframe: true});
	var sun = new starsgl.Sun(geometry, material);
	sun.position.set(0, 0, 0);
	this.mainCanvas.scene.add(sun);
	
	// lights
	light = new THREE.PointLight(0xFFFFFF);
	light.position.set(0, 0, 0);
	this.mainCanvas.scene.add(light);
	
	light = new THREE.AmbientLight(0x555555);
	this.mainCanvas.scene.add(light);
	
	// planets
	var planetJSON = this.JSON.planets // TODO: change everything to use the planetJSON reference
	for(var i = 0; i < this.JSON.planets.length; i++) {
		if(i === 0) {
			loader.load("models/mauriceh_spaceship_model.js", function(geometry) {
				material = new THREE.MeshLambertMaterial(0x999999)
				var starbase = new starsgl.Starbase(geometry, material);
				starbase.scale.set(5, 5, 5);
				starbase.position.set(self.JSON.planets[0].x, self.JSON.planets[0].y + 200, self.JSON.planets[0].z);
				self.mainCanvas.scene.add(starbase);
			});
			
//			geometry = new THREE.CubeGeometry(30, 30, 30);
//			material = new THREE.MeshBasicMaterial({color: 0xFFCC33, wireframe: true});
//			var starbase = new starsgl.Starbase(geometry, material);
//			starbase.position.set(this.JSON.planets[i].x, this.JSON.planets[i].y + 200, this.JSON.planets[i].z);
//			this.mainCanvas.scene.add(starbase);	
			
			texture = THREE.ImageUtils.loadTexture("textures/Hardening_Lava_02.jpg");
			geometry = new THREE.SphereGeometry(this.JSON.planets[i].radius, 50, 50);
			material = new THREE.MeshPhongMaterial({map: texture});
			var planet = new starsgl.Planet(geometry, material, this.JSON.planets[i]);
			planet.position.set(this.JSON.planets[i].x, this.JSON.planets[i].y, this.JSON.planets[i].z);
			this.mainCanvas.scene.add(planet);			
		}
		else if(i === 1) {
			texture = THREE.ImageUtils.loadTexture("textures/Planet_texture___Cloud_by_Qzma.jpg");
			geometry = new THREE.SphereGeometry(this.JSON.planets[i].radius, 50, 50);
			material = new THREE.MeshPhongMaterial({map: texture});
			var planet = new starsgl.Planet(geometry, material, this.JSON.planets[i]);
			planet.position.set(this.JSON.planets[i].x, this.JSON.planets[i].y, this.JSON.planets[i].z);
			this.mainCanvas.scene.add(planet);			
		}
		else {
			geometry = new THREE.SphereGeometry(this.JSON.planets[i].radius, 10, 10);
			material = new THREE.MeshBasicMaterial({color: 0x66FF00, wireframe: true});
			var planet = new starsgl.Planet(geometry, material, this.JSON.planets[i]);
			planet.position.set(this.JSON.planets[i].x, this.JSON.planets[i].y, this.JSON.planets[i].z);
			this.mainCanvas.scene.add(planet);
		}
		
		// orbit
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
			if(i === 0) {
				geometry = new THREE.SphereGeometry(moonJSON[j].radius, 10, 10);
				material = new THREE.MeshBasicMaterial({color: 0xCCCCCC, wireframe: true});
				var moon = new starsgl.Moon(geometry, material);
				moon.position.set(moonJSON[j].x, moonJSON[j].y, moonJSON[j].z);	
				this.mainCanvas.scene.add(moon);
			}
			else {
				geometry = new THREE.SphereGeometry(moonJSON[j].radius, 10, 10);
				material = new THREE.MeshBasicMaterial({color: 0xCCCCCC, wireframe: true});
				var moon = new starsgl.Moon(geometry, material);
				moon.position.set(moonJSON[j].x, moonJSON[j].y, moonJSON[j].z);	
				this.mainCanvas.scene.add(moon);				
			}
			
			// orbit
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