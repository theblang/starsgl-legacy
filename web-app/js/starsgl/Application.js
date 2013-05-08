starsgl.Application = function() {	
	var self = this;

	// populate test database
	$.ajax({
		type: "GET",
		url: "/starsgl/init/populateInMemoryDB",
		success: function(data, textStatus, jqXHR) {
			console.log("In memory database populated");
		},
		async: false
	});		
	
	// get user information
	$.ajax({
		type: "POST",
		url: "/starsgl/user/getByName?name=mattblang",
		success: function(data, textStatus, jqXHR) {
			self.user = data;
			console.log("user:mattblang loaded")
			console.log(data);
		},
		async: false
	});
	
	this.mainCanvas = new starsgl.MainCanvas(self.user.currentSystem.name);
	this.manufacturingCanvas = new starsgl.ManufacturingCanvas();
	
	this.initDOM();		
};

starsgl.Application.prototype.initDOM = function() {
	// tutorial
	$(".tutorial[data-num='0']").dialog({
		width: 500,
		stack: false,
		autoOpen: false,
		buttons: {
			"Next": function() {
				
			},
			Cancel: function() {
				$(this).dialog("close");
			}
		}	
	});	
	
	// main menu
	$("#ship-builder-button").button();		
	$("#ship-builder-button").click(function() {
		$("#ship-builder").dialog("open");
	});
	
	$("#research-button").button();
	$("#research-button").click(function() {
		$("#research").dialog("open");
	});	
	
	// options
	$("#optionsMenu").dialog({
		height: 500,
		width: 400,
		autoOpen: false,
		modal: true,
		buttons: {
			"Close": function() {
				$(this).dialog("close");
			}
		}
	});		
	
	// ship builder
	$("#ship-builder").dialog({
		modal: true,
		height: 500,
		width: 500,
		autoOpen: false,
	});
	
	$("#draggable").draggable({snap:"#snaptarget", snapMode:"inner"});	
	
	// research
	$("#research").dialog({
		modal: true,
		height: 500,
		width: 500,
		autoOpen: false
	});

	$("#research > span").each(function() {
        var value = parseInt( $( this ).text(), 10 );
        $( this ).empty().slider({
            value: value,
            range: "min",
            animate: true,
            orientation: "vertical"
        });
    });
	
	// manufacturing
	$("#manufacturing-dialog").dialog({
		modal: false,
		height: 500,
		width: 500,
		autoOpen: false,
		buttons: {
			"Close": function() {
				$(this).dialog("close");
			}
		}
	});	
	
	$("#build-starbase-button").button();
	
	// hover div
	$("#hover").hide();
	
};