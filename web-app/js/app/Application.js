starsgl.Application = function() {
	this.scene = new starsgl.Scene();
	this.ui = new starsgl.UI();
};

starsgl.Application.prototype.init = function() {
	this.scene.init();
	
	var that = this;
	$.ajax({
		type: "GET",
		url: "/starsgl/system/generateSystem",
		success: function(data, textStatus, jqXHR) {
			that.scene.system.setJSON(data);
			that.scene.drawSystem();
		}
	});
	$.ajax({
		type: "GET",
		url: "/starsgl/galaxy/generateGalaxy",
		success: function(data, textStatus, jqXHR) {
			that.scene.galaxy.setJSON(data);
			that.scene.createGalaxy();
		}
	});	
	
	// i was originally sending drawgalaxy as a callback, now its in context menu in Scene.  should i do the same with context menu?
	//this.ui.init(this.scene.drawGalaxy.bind(this.scene));
	this.ui.init();
}