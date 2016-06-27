package org.sharelost.dev.injection;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.sharelost.dev.common.support.TimeConstants;
import org.sharelost.user.Admin;
import org.sharelost.user.AdminRepository;
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

	private final static List<String> DEFAULT_USERS = ImmutableList.of("Daniel", "Jörg", "Thomas", "Robert",
			"Sebastian");

	private final static List<String> DEFAULT_ADMINS = ImmutableList.of("admin");
	private UserRepository _userRepository;
	private AdminRepository _adminRepository;

	@Autowired
	public DatabasePopulator(UserRepository userRepository, AdminRepository adminRepository) {
		_userRepository = userRepository;
		_adminRepository = adminRepository;
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

	public DatabasePopulator insertAdmin() {
		for (int i = 0; i < DEFAULT_ADMINS.size(); i++) {
			String password = "admin";
			String[] roles = new String[] { "ADMIN_ROLE" };
			Admin admin = new Admin(DEFAULT_ADMINS.get(i), password, roles);
			_adminRepository.save(admin);
		}
		return this;
	}
}
