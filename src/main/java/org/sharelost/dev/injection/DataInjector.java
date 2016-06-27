package org.sharelost.dev.injection;

import javax.annotation.PostConstruct;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.sharelost.item.ItemRepository;
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
	private ItemRepository _itemRepository;
	@Autowired
	public DataInjector(UserRepository userRepository, ItemRepository itemRepository, DatabasePopulator databasePopulator) {
		_userRepository = userRepository;
		_itemRepository = itemRepository;
		_databasePopulator = databasePopulator;
	}

	@PostConstruct
	private void inject() {
		Runnable injector = new Runnable() {

			@Override
			public void run() {
				if (!_userRepository.existsAtAll()) {
					_databasePopulator.insertUsers();
					Long usersAmount = _userRepository.count();
					LOG.info("Finished injecting " + usersAmount + " users ");
				} else {
					LOG.info("No entities will be injected.");
				}
				
				if (!_itemRepository.existsAtAll()) {
					_databasePopulator.insertItems();
					Long itemsAmount = _itemRepository.count();
					LOG.info("Finished injecting " + itemsAmount + " items ");
				} else {
					LOG.info("No entities will be injected.");
				}
			}
		};
		Thread thread = new Thread(injector);
		thread.start();
	}
}
