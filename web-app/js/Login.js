$(document).ready(function() {
	Login.init();
	RaceWizard.init();
});

var Login = {
	init: function() {
		$("#new-game").button().click(function() {
			$(".race-wizard[data-num='0']").dialog("open");
		});
		
		this.initTooltips();
	},
	
	initTooltips: function() {
		$("#hyper-expansion").tooltip({
			items: "#hyper-expansion",
			content: 
				"<ul>" +
				"<li class='green'>Your race will grow at twice the growth rate selected</li>" +
				"<li class='red'>The maximum population for a given planet is cut in half</li>" +
				"</ul>",
			track: true
		});
		
		$("#super-stealth").tooltip({
			items: "#super-stealth",
			content:
					"<ul>" +
					"<li class='green'>Your ships have 75% cloaking built in</li>" +
					"<li class='green'>Cargo does not decrease your cloaking abilities</li>" +
					"</ul>",
			track: true
		});		
		
	}
}

var RaceWizard = {
	init: function() {	
		$(".race-wizard[data-num='0']").dialog({
			width: 500,
			stack: false,
			autoOpen: false,
			buttons: {
				"Next": function() {
					$(this).dialog("close");
					$(".race-wizard[data-num='1']").dialog("open");
				},
				Cancel: function() {
					$(this).dialog("close");
				}
			}	
		});	
		
		$(".race-wizard[data-num='1']").dialog({
			width: 500,
			stack: false,
			autoOpen: false,
			buttons: {
				"Prev": function() {
					$(this).dialog("close");
					$(".race-wizard[data-num='0']").dialog("open");
				},
				"Next": function() {
					$self.dialog("close");
					$(".race-wizard[data-num='1']").dialog("open");
				},
				Cancel: function() {
					$(this).dialog("close");
				}
			}	
		});			
	},
}