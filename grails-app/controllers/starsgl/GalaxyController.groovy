package starsgl

import grails.converters.JSON

class GalaxyController {
	
	def getByName() {
		def galaxy = Galaxy.findByName("main")
		
		JSON.use("deep")
		render galaxy as JSON
	}
	
	// legacy generation
    def generateGalaxy() { 
		int distance = 1000;
		int galaxyMax = 50;
		
		Random random = new Random()
		
		def systems = []
		for(i in 0..galaxyMax) {
			int x = random.nextInt(distance + distance) - distance;
			int y = random.nextInt(distance + distance) - distance;
			int z = random.nextInt(distance + distance) - distance;
			
			def position = [x: x, y: y, z: z]
			def system = [position: position]
			systems.add(i, system)
		}
		
		def galaxy = [activeSystemIndex: 10, systems: systems]
		
		render(contentType: "text/json") {
			galaxy
		}
	}
}
