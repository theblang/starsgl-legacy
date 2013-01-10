<!DOCTYPE html5>
<html lang="en" class="no-js">
	<head>
		<meta charset="utf-8">
		
		<title>starsGL</title>
		
		<link rel="stylesheet" href="${resource(dir: 'css/vendor', file: 'jquery-ui-1.9.0.custom.min.css')}" type="text/css">
		<link rel="stylesheet" href="${resource(dir: 'css/vendor', file: 'jquery.contextMenu.css')}" type="text/css">
		<link rel="stylesheet" href="${resource(dir: 'css/app', file: 'main.css')}" type="text/css">
	</head>
	<body>
		<div id="main-canvas">
			<div id="interface">
				<div>
<%--					<g:render template="/screenSelect" />--%>
					<g:render template="/mainMenu" />
				</div>
				
				<g:render template="/shipBuilder" />
				<g:render template="/research" />
				
				<g:render template="/planetInfo" />
				
				<g:render template="/loading" />
				<g:render template="/tutorial" />
				<g:render template="/optionsMenu" />
			</div>
		</div>
	</body>
	
	<g:javascript src="vendor/jquery/jquery-1.8.2.min.js" />
	<g:javascript src="vendor/jquery/jquery-ui-1.9.0.custom.min.js" />
	<g:javascript src="vendor/jquery/jquery.ui.position.js" />
	<g:javascript src="vendor/jquery/jquery.contextMenu.js" />
	
	<g:javascript src="vendor/three/three.min.js" />
	<g:javascript src="vendor/three/THREEx.FullScreen.js" />
	<g:javascript src="vendor/three/THREEx.KeyboardState.js" />
	<g:javascript src="vendor/three/THREEx.WindowResize.js" />
	<g:javascript src="vendor/three/stats.min.js" />
	<g:javascript src="vendor/three/detector.js" />
	<g:javascript src="vendor/three/TrackballControls.js" />
	<g:javascript src="vendor/three/FirstPersonControls.js" />
	<g:javascript src="vendor/three/FlyControls.js" />
	<g:javascript src="vendor/three/OrbitControls.js" />
	<g:javascript src="vendor/three/ColladaLoader.js" />
	<g:javascript src="vendor/three/tween.min.js" />
	
	<g:javascript src="app/Starsgl.js" />
	<g:javascript src="app/Galaxy.js" />
	<g:javascript src="app/System.js" />		
	<g:javascript src="app/Scene.js" />
	<g:javascript src="app/UI.js" />
	<g:javascript src="app/Application.js" />
	
	<script>
		var app = new starsgl.Application();
		app.init();
	</script>
</html>
