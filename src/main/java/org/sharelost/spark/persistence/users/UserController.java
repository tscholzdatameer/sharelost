package org.sharelost.spark.persistence.users;

import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;

public class UserController {

	private static UserRepository _userRepository = new UserRepository();

	static {
		_userRepository.getOrCreateSessionFactory();
	}

	public static Object showUsers() {
		return _userRepository.findUserByName("gustav");
	}

	public static Object allUsers() {
		return _userRepository.findAllUsers();
	}

	public static boolean authenticate(String username, String password) {
		if (username.isEmpty() || password.isEmpty()) {
			return false;
		}
		Optional<User> userMayExistis = _userRepository.findUserByName(username);
		if (!userMayExistis.isPresent()) {
			return false;
		} else {
			User user = userMayExistis.get();
			String hashedPassword = BCrypt.hashpw(password, user.getSalt());
			return hashedPassword.equals(user.getHashedPassword());
		}
	}

}
