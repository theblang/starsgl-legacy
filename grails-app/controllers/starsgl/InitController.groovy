package starsgl

class InitController {
	
    def populateInMemoryDB() {
		def user = new User()
		user.setName("mattblang")
		
		def galaxy = new Galaxy()
		galaxy.setName("main")
		
		for(int i = 0; i < 5; i++) {
			def system = new System()
			system.setName("s" + i)
			
			Random random = new Random()
			
			// generate position in galaxy view
			int distance = 500;
			system.setX(random.nextInt(distance + distance) - distance)
			system.setY(random.nextInt(distance + distance) - distance)
			system.setZ(random.nextInt(distance + distance) - distance)
			
			// generate planets
			int planetMax = 12
			int planetMin = 3
			int planetRadiusMax = 150
			int planetRadiusMin = 50
			int planetNum = random.nextInt(planetMax - planetMin) + planetMin
			int planetR = 0 // total distance between center of planet and center of sun
			int planetIncrement = 700 // distance between each orbit pattern
				
			for(int j = 0; j < planetNum; j++) {
				def planet = new Planet();
				
				planetR += planetIncrement
				// reference: http://math.stackexchange.com/questions/253108/generate-random-points-on-the-perimeter-of-a-circle
				double planetAngle = Math.random() * Math.PI * 2
				int px = Math.cos(planetAngle) * planetR
				int py = 0
				int pz = Math.sin(planetAngle) * planetR
				int planetRadius = random.nextInt(planetRadiusMax - planetRadiusMin) + planetRadiusMin
				
				planet.setName("p" + j)
				planet.setX(px)
				planet.setY(py)
				planet.setZ(pz)
				planet.setRadius(planetRadius)
				planet.setDistanceFromSun(planetR)
				
				// generate moons
				int moonMax = 4
				int moonRadiusMax = 30
				int moonRadiusMin = 10
				int moonNum = random.nextInt(moonMax)
				int moonR = planetRadius // total distance between center of planet and center of moon
				int moonIncrement = 70
				
				for(int k = 0; k < moonNum; k++) {
					def moon = new Moon()
					
					moonR += moonIncrement
					double moonAngle = Math.random() * Math.PI * 2
					int mx = Math.cos(moonAngle) * moonR
					int my = 0
					int mz = Math.sin(moonAngle) * moonR
					
					moon.setName("p" + j + "-m" + k)
					moon.setX(mx + px)
					moon.setY(my + py)
					moon.setZ(mz + pz)
					moon.setRadius(random.nextInt(moonRadiusMax - moonRadiusMin) + moonRadiusMin)
					moon.setDistanceFromPlanet(moonR)
					
					moon.save()
					planet.addToMoons(moon)
				}
				
				planet.save()
				system.addToPlanets(planet)
			}
			
			system.save()
			galaxy.addToSystems(system)
		}
		
		galaxy.save()
		
		user.setCurrentSystem(galaxy.getSystems().get(0))
		user.save()
		
		render true
	}
}
