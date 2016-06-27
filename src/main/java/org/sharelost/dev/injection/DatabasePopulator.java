package org.sharelost.dev.injection;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.sharelost.dev.common.support.TimeConstants;
import org.sharelost.user.User;
import org.sharelost.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.collect.ImmutableList;

/**
 * Provides the functionality to easily populate the database with test data.
 */
@Service
public class DatabasePopulator {

	protected final Log LOG = LogFactory.getLog(DatabasePopulator.class.getName());

	private final static List<String> DEFAULT_USERS = ImmutableList.of("admin", "Daniel", "Jörg", "Thomas", "Robert", "Sebastian");

	private UserRepository _userRepository;

	@Autowired
	public DatabasePopulator( UserRepository userRepository) {
		_userRepository = userRepository;
	}

	public DatabasePopulator insertUsers() {
		long timeNow = System.currentTimeMillis();

		for (int i = 0; i < DEFAULT_USERS.size(); i++) {
			User user = new User();
			user.setName(DEFAULT_USERS.get(i));
			user.setRegistrationDate(timeNow - (i + 1) * TimeConstants.YEAR_IN_MILLISECONDS);
			_userRepository.save(user);
		}
		return this;
	}
}
