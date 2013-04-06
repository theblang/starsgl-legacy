starsgl.System = function(geometry, material, name) {
	THREE.Mesh.call(this);		
	
	this.geometry = geometry;
	this.material = material;
	this.name = name;
};

starsgl.System.prototype = Object.create(THREE.Mesh.prototype);

starsgl.System.prototype.onContextMenu = function(mainCanvas) {
	var self = this;
	
	$.contextMenu({
		selector: "#main-canvas",
		callback: function(key, options) {
			if(key === "enter") {
				mainCanvas.systemView.activeSystemName = self.name;
				mainCanvas.changeView(mainCanvas.systemView);
			}
		},
		items: {
			"enter": {name: "Enter"}
		}
	});
}
