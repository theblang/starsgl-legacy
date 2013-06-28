starsgl.Sun = function(geometry, material) {
	THREE.Mesh.call(this);		
	
	this.geometry = geometry;
	this.material = material;
};

starsgl.Sun.prototype = Object.create(THREE.Mesh.prototype);

/**
 * Process double click event on a Sun
 * 
 * @param {starsgl.MainCanvas} application The MainCanvas containing the Sun
 */
starsgl.Sun.prototype.onDblClick = function(mainCanvas) {	
};

starsgl.Sun.prototype.onContextMenu = function(mainCanvas) {
	$.contextMenu({
		selector: "#main-canvas",
		callback: function(key, options) {
			if(key === "exit") {
				mainCanvas.changeView(mainCanvas.galaxyView);					
			}
		},
		items: {
			"exit": {name: "Exit"}
		}
	});
}
