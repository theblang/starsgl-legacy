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
			system.setX(random.nextInt(distance + distance) - distance);
			system.setY(random.nextInt(distance + distance) - distance);
			system.setZ(random.nextInt(distance + distance) - distance);
			
			int planetMax = 12
			int planetMin = 3
			int planetRadiusMax = 150
			int planetRadiusMin = 50
			
			int planetR = 0 // total distance between center of planet and center of sun
			int planetIncrement = 700 // distance between each orbit pattern
			
			int planetNum = random.nextInt(planetMax - planetMin) + planetMin
			
			for(int j = 0; j < planetNum; j++) {
				planetR += planetIncrement
				
				int radius = random.nextInt(planetRadiusMax - planetRadiusMin) + planetRadiusMin // random radius
				
				// random position
				// reference: http://math.stackexchange.com/questions/253108/generate-random-points-on-the-perimeter-of-a-circle
				double planetAngle = Math.random() * Math.PI * 2
				int x = Math.cos(planetAngle) * planetR
				int y = 0
				int z = Math.sin(planetAngle) * planetR
				
				// add planet
				def planet = new Planet(name: "p" + j, x: x, y: y, z: z, radius: radius, distanceFromSun: planetR)
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
