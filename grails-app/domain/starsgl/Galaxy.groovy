package starsgl

class Galaxy {
	String name
	List systems
	
	static hasMany = [systems: System]
    static constraints = {
    }
}
