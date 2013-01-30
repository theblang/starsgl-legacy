starsgl.System = function(geometry, material) {
	THREE.Mesh.call(this);		
	
	this.geometry = geometry;
	this.material = material;
};

starsgl.System.prototype = Object.create(THREE.Mesh.prototype);

starsgl.System.prototype.onContextMenu = function(application) {
	$.contextMenu({
		selector: "#main-canvas",
		callback: function(key, options) {
			if(key === "enter") {
				application.changeView(application.systemView);
			}
		},
		items: {
			"enter": {name: "Enter"}
		}
	});
}
