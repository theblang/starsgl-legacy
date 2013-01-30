starsgl.MainCanvas = function() {	
	this.focusedObject = null;
	this.activeView = null;
	
	// initialize three.js 
	this.container = document.getElementById("main-canvas");
	this.scene = new THREE.Scene();
	
	this.renderer = new THREE.WebGLRenderer({antialias: true});
	this.renderer.setSize(window.innerWidth, window.innerHeight);
	this.container.appendChild(this.renderer.domElement);
	
	this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 20000);
	this.camera.position.set(starsgl.SYSTEM_CAMERA_START_X, starsgl.SYSTEM_CAMERA_START_Y, starsgl.SYSTEM_CAMERA_START_Z);
	
	this.controls = new THREE.OrbitControls(this.camera, this.container);
	this.controls.userZoomSpeed = 3.0;
	
	this.projector = new THREE.Projector();
	this.clock = new THREE.Clock();
	
	THREEx.WindowResize(this.renderer, this.camera);
	
	this.stats = new Stats();	
	this.stats.domElement.style.position = "absolute";
	this.stats.domElement.style.right = 0;
	this.stats.domElement.style.bottom = 0;
	this.stats.domElement.style.zIndex = 100;
	this.container.appendChild(this.stats.domElement);		
	
	// initialize system and galaxy view
	this.systemView = new starsgl.SystemView(this);
	this.galaxyView = new starsgl.GalaxyView(this);
	
	// get player starting information 
	this.activeView = this.systemView;  // TODO: make this an ajax call		
	
	// initialize events
	$(document).keyup(this.onKeyup.bind(this));	
	this.container.addEventListener("dblclick", this.onDblClick.bind(this), false);
	this.container.addEventListener("contextmenu", this.onContextMenu.bind(this), false);
	$(document).on("mousewheel", this.onMouseWheel.bind(this));	
	
	// draw starting view
	this.activeView.draw();
	
	// start rendering loop
	this.animate();
};

starsgl.MainCanvas.prototype.animate = function() {
	requestAnimationFrame(this.animate.bind(this));
	this.render();
	this.update();
};

starsgl.MainCanvas.prototype.render = function() {
	this.renderer.render(this.scene, this.camera);
};

starsgl.MainCanvas.prototype.update = function() {
	var delta = this.clock.getDelta();
	
	this.controls.update(delta);
	this.stats.update();
	TWEEN.update();
};

starsgl.MainCanvas.prototype.changeView = function(view) {
	this.activeView = view;

	var that = this; // TODO: is there a way to use bind instead?
	$("#main-canvas").fadeOut("slow", function() {
		that.activeView.draw();	
		$("#main-canvas").fadeIn("slow");	
	});
}

starsgl.MainCanvas.prototype.clear = function() {
	// reference: http://stackoverflow.com/questions/11678497/cant-remove-objects-using-three-js
	var obj, i;
	for(i = this.scene.children.length - 1; i >= 0; i--) {
		obj = this.scene.children[i];
		this.scene.remove(obj);
	}
};

starsgl.MainCanvas.prototype.onDblClick = function(event) {
	var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1, 0.5);
	this.projector.unprojectVector(vector, this.camera);
	var raycaster = new THREE.Raycaster(this.camera.position, vector.sub(this.camera.position).normalize());
	
	var intersects = [];
	intersects = raycaster.intersectObjects(this.scene.children);
	
	if (intersects.length > 0) {
		var obj = intersects[0].object;			
		
		// compute the position of the new camera location
		var A = new THREE.Vector3(this.camera.position.x, this.camera.position.y, this.camera.position.z);
		var B = new THREE.Vector3(obj.position.x, obj.position.y, obj.position.z);
		var AB = new THREE.Vector3((B.x - A.x), (B.y - A.y), (B.z - A.z));
		AB.normalize();
		var newPoint = B.sub((AB.multiplyScalar(obj.geometry.boundingSphere.radius + starsgl.FOCUS_DISTANCE)));
		
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

		obj.onDblClick(this);
		this.focusedObject = obj; // set the application's focused object
	}	
};

starsgl.MainCanvas.prototype.onContextMenu = function(event) {
	$.contextMenu("destroy"); // destroy previous context menu
	
	var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1, 0.5);
	this.projector.unprojectVector(vector, this.camera);
	var raycaster = new THREE.Raycaster(this.camera.position, vector.sub(this.camera.position).normalize());
	
	var intersects = [];
	intersects = raycaster.intersectObjects(this.scene.children);
	
	if (intersects.length > 0) {
		var obj = intersects[0].object;			

		obj.onContextMenu(this);
	}	
};

starsgl.MainCanvas.prototype.onKeyup = function(event) {
	if(event.which === 27) { // esc
		$("#optionsMenu").dialog("open");
	}
	
	if(event.which === 32) { // spacebar
		try {
			this.focusedObject.unFocus();			
		}
		catch(error) {
			// focusedObject not set
		}
		
		new TWEEN.Tween(this.controls.center).to( {
			x: 0,
			y: 0,
			z: 0}, 500)
		.start();			
		
		new TWEEN.Tween(this.camera.position).to( {
			x: starsgl.SYSTEM_CAMERA_START_X,
			y: starsgl.SYSTEM_CAMERA_START_Y,
			z: starsgl.SYSTEM_CAMERA_START_Z}, 500)
		.start();			
	}	
};

starsgl.MainCanvas.prototype.onMouseWheel = function(event) {
	this.activeView.onMouseWheel();
};