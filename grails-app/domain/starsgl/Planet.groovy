package starsgl

import java.util.List;

class Planet {
	String name
	int x
	int y
	int z
	int radius
	float distanceFromSun
	List moons
	
	static hasMany = [moons: Moon]
    static constraints = {
    }
}
