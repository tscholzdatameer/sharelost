package org.sharelost.persistence;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.sharelost.spark.persistence.Injector;
import org.sharelost.spark.persistence.users.User;
import org.sharelost.spark.persistence.users.UserRepository;

import static org.assertj.core.api.Assertions.assertThat;

public class InjectorTest {

	private SessionFactory factory;
	private Session hibernateSession;
	private static UserRepository _userRepository;

	@Before
	public void beforeTest() {
		factory = PersistenceTestSupport.getSessionFactory();
		_userRepository = new UserRepository();
		_userRepository.setSessionFactory(factory);
		hibernateSession = factory.openSession();
	}

	@After
	public void afterTest() {
		PersistenceTestSupport.deleteAllUsers();
		hibernateSession.close();
	}

	@Test
	public void testInjectUser_success() {
		assertThat(_userRepository.findAllUsers()).isEmpty();

		Injector.injectUsers(factory);

		assertThat(_userRepository.findUserByName("gustav")).isNotNull();
		assertThat(_userRepository.findAllUsers()).hasSize(1);
	}

	@Test
	public void testInjectUser_noInjection() {
		assertThat(_userRepository.findAllUsers()).isEmpty();
		_userRepository.saveUser(new User("someUser", "somepassword"));
		List<User> allUsers = _userRepository.findAllUsers();
		assertThat(allUsers).hasSize(1);
		assertThat(allUsers.get(0)._name).isEqualTo("someUser");

		Injector.injectUsers(factory);

		assertThat(_userRepository.findUserByName("someUser")).isNotNull();
		assertThat(allUsers).hasSize(1);
	}

}
