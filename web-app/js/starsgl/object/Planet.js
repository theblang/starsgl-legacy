starsgl.Planet = function(geometry, material) {
	THREE.Mesh.call(this);

	this.geometry = geometry;
	this.material = material;
};

starsgl.Planet.prototype = Object.create(THREE.Mesh.prototype);

starsgl.Planet.prototype.onDblClick = function() {
	// reference: http://stackoverflow.com/questions/2435751/jquery-fade-element-does-not-show-elements-styled-visibility-hidden
	$("#planet-info").css("visibility", "visible").hide().fadeIn("slow");			
};

starsgl.Planet.prototype.onContextMenu = function() {
	$.contextMenu({
		selector: "#main-canvas",
		callback: function(key, options) {
			if(key === "manufacturing") {
				$("#manufacturing-dialog").dialog("open");
				$("#manufacturing-dialog :button").blur(); // reference: http://stackoverflow.com/questions/1793592/jquery-ui-dialog-button-focus
			}
		},
		items: {
			"manufacturing": {name: "Manufacturing"}
		}
	});
}

starsgl.Planet.prototype.unFocus = function() {
	$("#planet-info").fadeOut();
};

