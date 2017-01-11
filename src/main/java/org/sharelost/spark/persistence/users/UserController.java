package org.sharelost.spark.persistence.users;

public class UserController {

	public static Object showUsers() {
		return UserRepository.findUser("gustav");
	}
}
