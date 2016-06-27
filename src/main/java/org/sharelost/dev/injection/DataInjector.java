package org.sharelost.dev.injection;

import javax.annotation.PostConstruct;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.sharelost.user.AdminRepository;
import org.sharelost.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("dev")
public class DataInjector {

	protected final Log LOG = LogFactory.getLog(DataInjector.class.getName());

	protected DatabasePopulator _databasePopulator;

	private UserRepository _userRepository;
	private AdminRepository _adminRepository;
	@Autowired
	public DataInjector(UserRepository userRepository, AdminRepository adminRepository,
			DatabasePopulator databasePopulator) {
		_userRepository = userRepository;
		_adminRepository = adminRepository;
		_databasePopulator = databasePopulator;
	}

	@PostConstruct
	private void inject() {
		Runnable usersInjector = new Runnable() {

			@Override
			public void run() {
				if (!_userRepository.existsAtAll()) {
					_databasePopulator.insertUsers().insertAdmin();
					Long usersAmount = _userRepository.count();
					LOG.info("Finished injecting " + usersAmount + " users ");
					Long adminsAmount = _adminRepository.count();
					LOG.info("Finished injecting " + adminsAmount + " admins ");
				} else {
					LOG.info("No entities will be injected.");
				}
			}
		};
		Thread thread = new Thread(usersInjector);
		thread.start();
	}
}
