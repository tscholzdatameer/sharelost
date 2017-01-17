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

	@BeforeClass
	public static void init() {
		factory = PersistenceTestSupport.getSessionFactory();
	}

	@Before
	public void beforeTest() {
		hibernateSession = factory.openSession();
	}

	@After
	public void afterTest() {
		hibernateSession.close();
	}

	@Test
	public void testFindAllUsers() {
		UserRepository userRepository = new UserRepository();
		userRepository.setSessionFactory(factory);
		userRepository.saveUser(new User("Gustav", "secretPwd"));
		userRepository.saveUser(new User("Donald", "otherSecred"));

		List<User> allUsers = userRepository.findAllUsers();
		assertThat(allUsers.get(0)._name).isEqualTo("Gustav");
		assertThat(allUsers.get(0)._password).isEqualTo("secretPwd");
		assertThat(allUsers.get(1)._name).isEqualTo("Donald");
		assertThat(allUsers.get(1)._password).isEqualTo("otherSecred");
	}

}
