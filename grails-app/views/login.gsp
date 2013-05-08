<!DOCTYPE html5>
<html>
    <head>
        <meta charset="utf-8">
        
        <title>starsGL</title>

		<link rel="stylesheet" href="${resource(dir: 'css/vendor', file: 'jquery-ui-1.10.2.custom.min.css')}" type="text/css">
		<style>
			img#gale-crater {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				z-index: -1;
			}
			
			div#login-form {
				
				width: 300px;
				margin-top: 35%;
				margin-left: auto;
				margin-right: auto;
			}
			
			div#login-form input {
				display: block;
				margin-bottom: 5px;
				margin-left: auto;
				margin-right: auto;
			}
			
			div#login-form input[type="submit"] {
				margin-left: auto;
				margin-right: auto;
				margin-top: 10px;
			}	
			
			label.align {
				display: block;
				float: left;
				width: 200px;
			}
			
			div.align {
				display: inline-block;
			}	
			
			div.right {
				float: right;
			}
			
			.green {
				color: green;
			}
			
			.red {
				color: red;
			}
			
					
		</style>
    </head>
    <body id="login">
		<audio controls="controls" autoplay="autoplay">
			<source src="sounds/Trans_Atlantic_RageBalogh_-_02_-_DISTORTED_ROSE_DRIFT_IN_SPACE.mp3" type="audio/mp3"></source>
		</audio>

		<img id="gale-crater" src="images/602861main_pia14293-amended-full_full.jpg"/>
		<div id="login-form">
			<input type="text">
			<input type="password">
			<input id="login-submit" type="submit" value="Log In">
			<input id="new-game" type="button" value="New Game">
		</div>
		
		<g:render template="/login/raceWizard" />
		
		<g:javascript src="vendor/jquery/jquery-1.9.1.min.js" />
		<g:javascript src="vendor/jquery/jquery-ui-1.10.2.custom.min.js" />	
		<g:javascript src="Login.js" />	
				
		<script>
			$("input[type=submit]").button();

			$("#login-submit").click(function() {
				$("div#login-form").fadeOut("slow", function() {
					location.href = "/starsgl/"
				});			
			});			
		</script>
    </body>
</html>
