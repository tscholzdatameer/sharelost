package org.sharelost.spark.persistence.users;

public class UserController {

	private static UserRepository _userRepository = new UserRepository();

	public static Object showUsers() {
		return _userRepository.findUser("gustav");
	}

	public static Object allUsers() {
		return _userRepository.findAllUsers();
	}
}
