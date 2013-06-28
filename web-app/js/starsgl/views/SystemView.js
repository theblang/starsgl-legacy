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
			
			// reference: http://stackoverflow.com/questions/11020405/basic-2d-colored-triangle-using-three-js
			geometry = new THREE.Geometry(100, 100, 100);
			var v1 = new THREE.Vector3(50, 0, 0);
			var v2 = new THREE.Vector3(-50, 0, 0);
			var v3 = new THREE.Vector3(0, 100, 0);
			geometry.vertices.push(v1);
			geometry.vertices.push(v2);
			geometry.vertices.push(v3);
			geometry.faces.push(new THREE.Face3(0, 2, 1));
			geometry.faces.push(new THREE.Face3(0, 1, 2));
			var ship = new starsgl.Ship(geometry, new THREE.MeshBasicMaterial({color: 0xFF0000}));
			ship.position.set(0, 200, 0);
			ship.rotation.set(90, 0, 0);
			this.mainCanvas.scene.add(ship);
			
//			geometry = new THREE.Geometry();
//			geometry.vertices.push(new THREE.Vector3(0, 0, 0));
//			geometry.vertices.push(new THREE.Vector3(0, 100, 0));
//			var line = new THREE.Line(geometry, new THREE.MeshBasicMaterial({color: 0xFF0000}));
//			line.position.set(0, 200, 0);
//			//line.rotation.set(45, 45, 45);
//			line.scale.set(5, 5, 5);
//			this.mainCanvas.scene.add(line);
//			
//			geometry = new THREE.Geometry();
//			geometry.vertices.push(new THREE.Vector3(0, 0, 0));
//			geometry.vertices.push(new THREE.Vector3(0, 100, 0));
//			var line = new THREE.Line(geometry, new THREE.MeshBasicMaterial({color: 0xFF0000}));
//			line.position.set(0, 200, 0);
//			//line.rotation.set(45, 45, 45);
//			line.scale.set(5, 5, 5);
//			this.mainCanvas.scene.add(line);			
			
			geometry = new THREE.TetrahedronGeometry(50, 0);
			geometry.applyMatrix(new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, -1).normalize(), Math.atan(Math.sqrt(2))));
			var ship2 = new starsgl.Ship(geometry, new THREE.MeshBasicMaterial({color: 0xFF0000, wireframe: true}));
			ship2.position.set(0, -400, 0);
			ship2.scale.set(1, 2.5, 1);
			this.mainCanvas.scene.add(ship2);
		}
		
		geometry = new THREE.SphereGeometry(this.JSON.planets[i].radius, 10, 10);
		material = new THREE.MeshBasicMaterial({color: 0x66FF00, wireframe: true});
		var planet = new starsgl.Planet(geometry, material, this.JSON.planets[i]);
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