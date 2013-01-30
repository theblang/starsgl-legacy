starsgl.Sun = function(geometry, material) {
	THREE.Mesh.call(this);		
	
	this.geometry = geometry;
	this.material = material;
};

starsgl.Sun.prototype = Object.create(THREE.Mesh.prototype);

/**
 * Process double click event on a Sun
 * 
 * @param {starsgl.Application} application The starsgl.Application containing the Sun
 */
starsgl.Sun.prototype.onDblClick = function(application) {	
};

starsgl.Sun.prototype.onContextMenu = function(application) {
	$.contextMenu({
		selector: "#main-canvas",
		callback: function(key, options) {
			if(key === "exit") {
				application.changeView(application.galaxyView);					
			}
		},
		items: {
			"exit": {name: "Exit"}
		}
	});
}
