starsgl.Application = function() {	
	this.mainCanvas = new starsgl.MainCanvas();
	this.manufacturingCanvas = new starsgl.ManufacturingCanvas();
	
	this.initDOM();
};

starsgl.Application.prototype.initDOM = function() {
	// tutorial
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
	
	// jquery combobox
	(function( $ ) {
	$.widget( "ui.combobox", {
	  _create: function() {
	    var input,
	      that = this,
	      wasOpen = false,
	      select = this.element.hide(),
	      selected = select.children( ":selected" ),
	      value = selected.val() ? selected.text() : "",
	      wrapper = this.wrapper = $( "<span>" )
	        .addClass( "ui-combobox" )
	            .insertAfter( select );
	 
	        function removeIfInvalid( element ) {
	          var value = $( element ).val(),
	            matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( value ) + "$", "i" ),
	        valid = false;
	      select.children( "option" ).each(function() {
	            if ( $( this ).text().match( matcher ) ) {
	              this.selected = valid = true;
	              return false;
	            }
	          });
	 
	          if ( !valid ) {
	            // remove invalid value, as it didn't match anything
	        $( element )
	          .val( "" )
	          .attr( "title", value + " didn't match any item" )
	          .tooltip( "open" );
	        select.val( "" );
	        setTimeout(function() {
	          input.tooltip( "close" ).attr( "title", "" );
	        }, 2500 );
	        input.data( "ui-autocomplete" ).term = "";
	          }
	        }
	 
	        input = $( "<input>" )
	      .appendTo( wrapper )
	      .val( value )
	      .attr( "title", "" )
	      .addClass( "ui-state-default ui-combobox-input" )
	      .autocomplete({
	        delay: 0,
	        minLength: 0,
	        source: function( request, response ) {
	          var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
	          response( select.children( "option" ).map(function() {
	            var text = $( this ).text();
	            if ( this.value && ( !request.term || matcher.test(text) ) )
	              return {
	                label: text.replace(
	                  new RegExp(
	                    "(?![^&;]+;)(?!<[^<>]*)(" +
	                    $.ui.autocomplete.escapeRegex(request.term) +
	                    ")(?![^<>]*>)(?![^&;]+;)", "gi"
	                  ), "<strong>$1</strong>" ),
	                value: text,
	                option: this
	              };
	          }) );
	        },
	        select: function( event, ui ) {
	          ui.item.option.selected = true;
	          that._trigger( "selected", event, {
	            item: ui.item.option
	          });
	        },
	        change: function( event, ui ) {
	          if ( !ui.item ) {
	            removeIfInvalid( this );
	          }
	        }
	      })
	      .addClass( "ui-widget ui-widget-content ui-corner-left" );
	 
	        input.data( "ui-autocomplete" )._renderItem = function( ul, item ) {
	      return $( "<li>" )
	        .append( "<a>" + item.label + "</a>" )
	            .appendTo( ul );
	        };
	 
	        $( "<a>" )
	      .attr( "tabIndex", -1 )
	      .attr( "title", "Show All Items" )
	      .tooltip()
	      .appendTo( wrapper )
	      .button({
	        icons: {
	          primary: "ui-icon-triangle-1-s"
	        },
	        text: false
	      })
	      .removeClass( "ui-corner-all" )
	      .addClass( "ui-corner-right ui-combobox-toggle" )
	      .mousedown(function() {
	        wasOpen = input.autocomplete( "widget" ).is( ":visible" );
	          })
	          .click(function() {
	            input.focus();
	 
	            // close if already visible
	            if ( wasOpen ) {
	              return;
	            }
	 
	            // pass empty string as value to search for, displaying all results
	        input.autocomplete( "search", "" );
	          });
	 
	        input.tooltip({
	          tooltipClass: "ui-state-highlight"
	        });
	      },
	 
	      _destroy: function() {
	        this.wrapper.remove();
	        this.element.show();
	      }
	    });
	  })( jQuery );
	 
	  $(function() {
	    $( "#combobox" ).combobox();
	    $( "#toggle" ).click(function() {
    	$( "#combobox" ).toggle();
	    });
	  });	
};