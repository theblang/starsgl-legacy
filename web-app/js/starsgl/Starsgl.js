var starsgl = starsgl || {};

starsgl.GALAXY = "galaxy";
starsgl.SYSTEM = "system";
starsgl.SUN = "sun";
starsgl.PLANET = "planet";
starsgl.SYSTEM_CAMERA_START_X = 3000;
starsgl.SYSTEM_CAMERA_START_Y = 3000;
starsgl.SYSTEM_CAMERA_START_Z = 3000;
starsgl.SYSTEM_RADIUS = 50;
starsgl.FOCUS_DISTANCE = 150;

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
	this.initRefreshListener();
};

starsgl.Application.prototype.initRefreshListener = function() {
	$(document).on("starsgl.refresh", function() {
		var $scope = angular.element("body").scope();
		$scope.$apply(function() {
			$scope.test = "new message";
		})
		console.log("the refresh function");
	});	
}

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
	$("#galaxy-button").button();		
	$("#galaxy-button").click(function() {
		$("#galaxy").dialog("open");
	});	
	
	$("#ship-builder-button")
		.button()
		.click(function() {
			$("#ship-builder").dialog("open");
		});
	
	$("#research-button")
		.button()
		.click(function() {
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
	
	// galaxy view
	$("galaxy").dialog({
		modal: false,
		height: 500,
		width: 500,
		autoOpen: false
	});
	
	$("#build-starbase-button").button();
	
	// hover div
	$("#hover").hide();
	
};