<!DOCTYPE html5>
<html lang="en" class="no-js">
	<head>
		<meta charset="utf-8">
		
		<title>starsgl</title>
		
		<link rel="stylesheet" href="${resource(dir: 'css/vendor', file: 'jquery-ui-1.9.0.custom.min.css')}" type="text/css">
		<link rel="stylesheet" href="${resource(dir: 'css/vendor', file: 'jquery.contextMenu.css')}" type="text/css">
		<link rel="stylesheet" href="${resource(dir: 'css/app', file: 'main.css')}" type="text/css">
		
		<g:javascript src="vendor/jquery/jquery-1.8.2.min.js" />
		<g:javascript src="vendor/jquery/jquery-ui-1.9.0.custom.min.js" />			
	</head>
	<body>
		<div id="main-canvas">
			<div id="interface">
				<div>
					<g:render template="/mainMenu" />
				</div>
				
				<g:render template="/shipBuilder" />
				<g:render template="/research" />
				
				<g:render template="/planetInfo" />
				
				<g:render template="/loading" />
				<g:render template="/tutorial" />
				<g:render template="/optionsMenu" />
				
				<g:render template="/manufacturing" />
			</div>
		</div>
		
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
		
		<g:javascript src="starsgl/Starsgl.js" />
		<g:javascript src="starsgl/object/Sun.js" />
		<g:javascript src="starsgl/object/Planet.js" />	
		<g:javascript src="starsgl/object/Moon.js" />
		<g:javascript src="starsgl/object/System.js" />
		<g:javascript src="starsgl/object/Starbase.js" />	
		<g:javascript src="starsgl/view/GalaxyView.js" />
		<g:javascript src="starsgl/view/SystemView.js" />
		<g:javascript src="starsgl/view/ManufacturingView.js" />
		<g:javascript src="starsgl/canvas/MainCanvas.js" />
		<g:javascript src="starsgl/canvas/ManufacturingCanvas.js" />		
		<g:javascript src="starsgl/Application.js" />
		
		<script>
			var app = new starsgl.Application();
		</script>
	</body>
</html>
