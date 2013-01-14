starsgl.Scene = function() {
	this.container = document.getElementById("main-canvas");
	this.scene = new THREE.Scene();
	this.renderer = new THREE.WebGLRenderer({antialias: true});
	this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 20000);
	this.controls = new THREE.OrbitControls(this.camera, this.container);
	this.projector = new THREE.Projector();
	this.clock = new THREE.Clock();
	this.stats = new Stats();	
	
	this.system = new starsgl.System(this.scene);
	this.galaxy = new starsgl.Galaxy();
	this.activeScene = starsgl.SYSTEM;
	this.activeGalaxy = null;
};

starsgl.Scene.prototype.init = function() {
	var that = this;
	
	this.renderer.setSize(window.innerWidth, window.innerHeight);
	
	this.container.appendChild(this.renderer.domElement);
	
	this.projector = new THREE.Projector();
	
	this.camera.position.set(3000, 3000, 3000);
	
	this.controls.userZoomSpeed = 3.0;
	
	this.stats.domElement.style.position = "absolute";
	this.stats.domElement.style.right = 0;
	this.stats.domElement.style.bottom = 0;
	this.stats.domElement.style.zIndex = 100;
	//this.stats.domElement.style.float = "right";
	//this.stats.domElement.style.marginLeft = "auto";
	this.container.appendChild(this.stats.domElement);
	
	this.container.addEventListener("dblclick", this.onDblClick.bind(this), false);
	this.container.addEventListener("contextmenu", this.onContextMenu.bind(this), false);
	THREEx.WindowResize(this.renderer, this.camera);
	
	$(document).on("mousewheel", function(event) {
		$("#planet-info-1").fadeOut("slow");		
		$("#planet-info-2").fadeOut("slow");		
	});
	
	$(document).keyup(function(event) {
		if(event.which === 27) { // esc
			$("#optionsMenu").dialog("open");
		}
		if(event.which === 32) { // spacebar
			if(that.activeScene === starsgl.SYSTEM) {
				new TWEEN.Tween(that.controls.center).to( {
					x: 0,
					y: 0,
					z: 0}, 500)
				.start();			
				
				new TWEEN.Tween(that.camera.position).to( {
					x: starsgl.SYSTEM_CAMERA_START_X,
					y: starsgl.SYSTEM_CAMERA_START_Y,
					z: starsgl.SYSTEM_CAMERA_START_Z}, 500)
				.start();
				
				$("#planet-info-1").fadeOut("slow");		
				$("#planet-info-2").fadeOut("slow");					
			}
		}
	});		
	
	this.animate();
};

starsgl.Scene.prototype.animate = function() {
	requestAnimationFrame(this.animate.bind(this));
	this.render();
	this.update();
};

starsgl.Scene.prototype.render = function() {
	this.renderer.render(this.scene, this.camera);
};

starsgl.Scene.prototype.update = function() {
	var delta = this.clock.getDelta();
	
	this.controls.update(delta);
	this.stats.update();
	TWEEN.update();
};

starsgl.Scene.prototype.drawSystem = function() {
	this.hideGalaxy();
	this.activeScene = starsgl.SYSTEM;
	
	this.camera.position.set(starsgl.SYSTEM_CAMERA_START_X, starsgl.SYSTEM_CAMERA_START_Y, starsgl.SYSTEM_CAMERA_START_Z);
	this.controls.center.set(0, 0, 0);
	var JSON = this.system.JSON;
	var geometry, material, sun, planet, moon;
	
	// draw sun
	geometry = new THREE.SphereGeometry(100, 10, 10);
	material = new THREE.MeshBasicMaterial({color: 0xFFCC33, wireframe: true});
	sun = new THREE.Mesh(geometry, material);
	sun.position.set(0, 0, 0);
	this.system.planetContainer.add(sun);
	
	// draw planets
	for(var i = 0; i < JSON.length; i++) {
		geometry = new THREE.SphereGeometry(JSON[i].radius, 10, 10);
		material = new THREE.MeshBasicMaterial({color: 0x66FF00, wireframe: true});
		planet = new THREE.Mesh(geometry, material);
		planet.position.set(JSON[i].position.x, JSON[i].position.y, JSON[i].position.z);
		this.system.planetContainer.add(planet);
		
		this.system.orbitContainer.add(this.system.createOrbit(JSON[i].distanceFromSun));
		
		// draw moons
		for(var j = 0; j < JSON[i].moons.length; j++) {
			geometry = new THREE.SphereGeometry(JSON[i].moons[j].radius, 10, 10);
			material = new THREE.MeshBasicMaterial({color: 0xCCCCCC, wireframe:true});
			moon = new THREE.Mesh(geometry, material);
			moon.position.set(JSON[i].moons[j].position.x, JSON[i].moons[j].position.y, JSON[i].moons[j].position.z);
			
			// translate moon to planet
			var translation = new THREE.Vector3(JSON[i].position.x, JSON[i].position.y, JSON[i].position.z);
			moon.translateX(translation.x);
			moon.translateY(translation.y);
			moon.translateZ(translation.z);
			
			this.system.planetContainer.add(moon); // TODO: should I make a moon container?
		}
	}
	this.scene.add(this.system.orbitContainer);
	this.scene.add(this.system.planetContainer);
};

starsgl.Scene.prototype.clearSystem = function() {
	this.scene.remove(this.system.planetContainer);
	this.scene.remove(this.system.orbitContainer);
};

starsgl.Scene.prototype.createGalaxy = function() {
	var geometry, material, system;
	
	for(var i = 0; i < this.galaxy.JSON.systems.length; i++) {
		geometry = new THREE.SphereGeometry(starsgl.SYSTEM_RADIUS, 10, 10);
		material = new THREE.MeshBasicMaterial({color: 0xFFCC33, wireframe: true});
		system = new THREE.Mesh(geometry, material);
		system.position.set(this.galaxy.JSON.systems[i].position.x, this.galaxy.JSON.systems[i].position.y, this.galaxy.JSON.systems[i].position.z)
		this.galaxy.systemContainer.add(system);
		
		this.galaxy.systemContainer.visible = false;
		this.galaxy.systemContainer.traverse(function(child) {
			child.visible = false;
		});
		
		this.scene.add(this.galaxy.systemContainer);
	}
};

starsgl.Scene.prototype.showGalaxy = function() {
	this.clearSystem();
	this.activeScene = starsgl.GALAXY;
	
	// focus the system that the user last visited
	var activeSystem = this.galaxy.JSON.systems[this.galaxy.activeSystemIndex];
	this.camera.position.set(activeSystem.position.x, activeSystem.position.y, activeSystem.position.z + starsgl.SYSTEM_RADIUS + starsgl.FOCUS_DISTANCE);
	this.controls.center.set(activeSystem.position.x, activeSystem.position.y, activeSystem.position.z);
	
	this.galaxy.systemContainer.visible = true;
	this.galaxy.systemContainer.traverse(function(child) {
		child.visible = true;
	});
}

starsgl.Scene.prototype.hideGalaxy = function() {
	this.galaxy.systemContainer.visible = false;
	this.galaxy.systemContainer.traverse(function(child) {
		child.visible = false;
	});
};

starsgl.Scene.prototype.onDblClick = function(event) {
	var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
	this.projector.unprojectVector(vector, this.camera);
	var ray = new THREE.Ray(this.camera.position, vector.subSelf(this.camera.position).normalize());
	
	var intersects = [];
	if(this.activeScene === starsgl.SYSTEM) {
		intersects = ray.intersectObjects(this.system.planetContainer.children);		
	}
	else if(this.activeScene === starsgl.GALAXY) {
		intersects = ray.intersectObjects(this.galaxy.systemContainer.children);
	}
	
	if (intersects.length > 0) {
		if(this.activeScene === starsgl.SYSTEM) {
//			$("#planet-info-1").css("visibility", "visible");
//			$("#planet-info-2").css("visibility", "visible");		
			$("#planet-info-1").css("visibility", "visible").hide().fadeIn("slow");		
			$("#planet-info-2").css("visibility", "visible").hide().fadeIn("slow");	
		}
		
		var obj = intersects[0].object;			
		
		// compute the position of the new camera location
		var A = new THREE.Vector3(this.camera.position.x, this.camera.position.y, this.camera.position.z);
		var B = new THREE.Vector3(obj.position.x, obj.position.y, obj.position.z);
		var AB = new THREE.Vector3((B.x - A.x), (B.y - A.y), (B.z - A.z));
		AB.normalize();
		var newPoint = B.subSelf((AB.multiplyScalar(obj.boundRadius + starsgl.FOCUS_DISTANCE)));

		new TWEEN.Tween(this.controls.center).to( {
			x: obj.position.x,
			y: obj.position.y,
			z: obj.position.z}, 500)
		.start();			
		
		new TWEEN.Tween(this.camera.position).to( {
			x: newPoint.x,
			y: newPoint.y,
			z: newPoint.z}, 500)
		.start();
		
		//ui.showPlanetInfo();
	}	
};

starsgl.Scene.prototype.focusPlanet = function() {
	
};

starsgl.Scene.prototype.onContextMenu = function(event) {
	var that = this;
	$.contextMenu("destroy");
	
	var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
	this.projector.unprojectVector(vector, this.camera);
	var ray = new THREE.Ray(this.camera.position, vector.subSelf(this.camera.position).normalize());
	
	var intersects = [];
	if(this.activeScene === starsgl.SYSTEM) {
		intersects = ray.intersectObjects(this.system.planetContainer.children);	
		
		if (intersects.length > 0) {	
			$.contextMenu({
				selector: "#main-canvas",
				callback: function(key, options) {
					if(key === "exit") {
						$("#planet-info-1").css("visibility", "hidden");
						$("#planet-info-2").css("visibility", "hidden");							
						that.showGalaxy();
					}
				},
				items: {
					"exit": {name: "Exit System"},
					"foo": {name: "Foo"},
					"bar": {name: "Bar"}
				}
			});
		}			
	}
	else if(this.activeScene === starsgl.GALAXY) {
		intersects = ray.intersectObjects(this.galaxy.systemContainer.children);
		
		if (intersects.length > 0) {	
			
			$.contextMenu({
				selector: "#main-canvas",
				callback: function(key, options) {
					if(key === "enter") {
						that.drawSystem();
					}
				},
				items: {
					"enter": {name: "Enter System"},
					"foo": {name: "Foo"},
					"bar": {name: "Bar"}
				}
			});
		}
	}	
};

starsgl.Scene.prototype.test = function() {
	console.log(this.galaxy.JSON);
};