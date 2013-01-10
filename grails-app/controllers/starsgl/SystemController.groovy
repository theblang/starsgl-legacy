package starsgl

class SystemController {

    def generateSystem() { 
		int planetMax = 12
		int planetMin = 4
		int moonMax = 4
		int planetRadiusMax = 150
		int planetRadiusMin = 50
		int moonRadiusMax = 30
		int moonRadiusMin = 10
		
		Random random = new Random()
		
		// generate planets
		def planets = []
		int planetNum = random.nextInt(planetMax - planetMin) + planetMin
		int planetR = 0
		int planetIncrement = 700
		
		for(int i = 0; i < planetNum; i++) {
			planetR += planetIncrement
			
			// generate position
			double planetAngle = Math.random() * Math.PI * 2
			def planetPosition = [x: Math.cos(planetAngle) * planetR, y: 0, z: Math.sin(planetAngle) * planetR]

			// generate radius
			int planetRadius = random.nextInt(planetRadiusMax - planetRadiusMin) + planetRadiusMin
			
			// generate moons
			def moons = []
			int moonNum = random.nextInt(moonMax)
			int moonR = planetRadius
			int moonIncrement = 70
			for(int j = 0; j < moonNum; j++) {
				moonR += moonIncrement
				
				// generate position
				double moonAngle = Math.random() * Math.PI * 2
				def moonPosition = [x: Math.cos(moonAngle) * moonR, y: 0, z: Math.sin(moonAngle) * moonR]
				
				// generate radius
				int moonRadius = random.nextInt(moonRadiusMax - moonRadiusMin) + moonRadiusMin
				
				def moon = [position: moonPosition, radius: moonRadius]
				moons.add(j, moon)
			}
			
			def planet = [position: planetPosition, radius: planetRadius, distanceFromSun: planetR, moons: moons]
			planets.add(i, planet)
		}
		
//		def position1 = [x: 100, y: 50, z: -50]
//		def planet1 = [planet: 1, radius: 50, position: position1]
//		def planet2 = [planet: 2, radius: 30, position: position1]
//		def planet3 = [planet: 3, radius: 40, position: position1]
		
		
		render(contentType: "text/json") {
			planets
		}
	}
}
