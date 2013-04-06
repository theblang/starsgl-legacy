package starsgl

class System {
	String name
	List planets
	Integer x, y, z // position in the galaxy
	
	static hasMany = [planets: Planet]
    static constraints = {
    }
}
