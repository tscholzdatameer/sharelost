package org.sharelost.persistence.users;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.sharelost.persistence.PersistenceTestSupport;
import org.sharelost.spark.persistence.users.User;
import org.sharelost.spark.persistence.users.UserRepository;

import static org.assertj.core.api.Assertions.assertThat;

public class UserRepositoryTest {

	private static SessionFactory factory;
	private static Session hibernateSession;
	private static UserRepository _userRepository;

	@BeforeClass
	public static void init() {
		factory = PersistenceTestSupport.getSessionFactory();
	}

	@Before
	public void beforeTest() {
		hibernateSession = factory.openSession();
		_userRepository = new UserRepository();
		_userRepository.setSessionFactory(factory);
	}

	@After
	public void afterTest() {
		PersistenceTestSupport.deleteAllUsers();
		hibernateSession.close();
	}

	@Test
	public void testFindAllUsers() {
		_userRepository.saveUser(new User("Gustav", "secretPwd"));
		_userRepository.saveUser(new User("Donald", "otherSecred"));

		List<User> allUsers = _userRepository.findAllUsers();
		assertThat(allUsers.get(0)._name).isEqualTo("Gustav");
		assertThat(allUsers.get(0)._hashedPassword).isEqualTo("secretPwd");
		assertThat(allUsers.get(1)._name).isEqualTo("Donald");
		assertThat(allUsers.get(1)._hashedPassword).isEqualTo("otherSecred");
	}

}
