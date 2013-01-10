starsgl.UI = function() {
};

starsgl.UI.prototype.init = function() {
	
	$("button").button();
	
	$("div#planetSelect").buttonset();

	$("#shipBuilder, #research").dialog({
		modal: true,
		height: 500,
		width: 500,
		autoOpen: false
	});
	
	$("#draggable").draggable({snap:"#snaptarget", snapMode:"inner"});
	
	$("#research > span").each(function() {
        // read initial values from markup and remove that
        var value = parseInt( $( this ).text(), 10 );
        $( this ).empty().slider({
            value: value,
            range: "min",
            animate: true,
            orientation: "vertical"
        });
    });
	
	$(".tutorial[data-num='0']").dialog({
		width: 500,
		stack: false,
		buttons: {
			"Next": function() {
				
			},
			Cancel: function() {
				$(this).dialog("close");
			}
		}	
	});	

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
	
	/* planet info */
//	$("#planet-info-1").draggable();
//	$("#planet-info-2").draggable();
	
	this.initEventListeners();	
};


starsgl.UI.prototype.initEventListeners = function() {
	var that = this;
	
	$("button#systemSelect").click(function() {
		$.ajax({
			type: "GET",
			url: "/starsgl/test/test",
			success: function(data, textStatus, jqXHR) {
			}
		});
	})
	
	$("button#systemSelect").click(function() {
		$.ajax({
			type: "GET",
			url: "/starsgl/test/test",
			success: function(data, textStatus, jqXHR) {
				planets = data.planets;	
			}
		});	
		
		gl.drawSystem();
		showSystemMenus();
	});
	
	$("input[type='radio']").click(function() {
		var $this = $(this);
		var planet = planets[$this.attr("data-planet")];
		
		gl.drawPlanet(planet.radius, planet.position);
	});
	
	$("button#galaxySelect").click(function() {
	});
	
	$("button#shipBuilderButton").click(function() {
		$("#shipBuilder").dialog("open");
	});
	
	$("button#researchButton").click(function() {
		$("#research").dialog("open");
	});	
}