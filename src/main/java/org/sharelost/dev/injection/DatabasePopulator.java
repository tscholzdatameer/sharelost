package org.sharelost.dev.injection;

import java.util.List;
import java.util.concurrent.TimeUnit;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.sharelost.dev.common.support.TimeConstants;
import org.sharelost.item.Item;
import org.sharelost.item.ItemRepository;
import org.sharelost.user.User;
import org.sharelost.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.javafaker.Faker;
import com.github.javafaker.Name;
import com.google.common.collect.ImmutableList;

/**
 * Provides the functionality to easily populate the database with test data.
 */
@Service
public class DatabasePopulator {

	protected final Log LOG = LogFactory.getLog(DatabasePopulator.class.getName());

	private UserRepository _userRepository;
	private ItemRepository _itemRepository;
	
	Faker faker = new Faker();

	@Autowired
	public DatabasePopulator( UserRepository userRepository, ItemRepository itemRepository) {
		_userRepository = userRepository;
		_itemRepository = itemRepository;
	}

	public DatabasePopulator insertUsers() {
		long timeNow = System.currentTimeMillis();

		for (int i = 0; i < 50; i++) {
			String firstName = faker.name().firstName();
			String lastName = faker.name().lastName();
			User user = new User();
			user.setName(firstName);
			user.setPassword(faker.internet().password());
			user.setRegistrationDate(faker.date().past(100, TimeUnit.DAYS));
			user.setEmail(faker.internet().emailAddress(firstName.toLowerCase() + "." + lastName.toLowerCase()));
			_userRepository.save(user);
		}
		return this;
	}
	
	public DatabasePopulator insertItems() {
		long timeNow = System.currentTimeMillis();

		for (int i = 0; i < 200; i++) {
			User user = _userRepository.findOne(faker.number().numberBetween(0, (long) 49));
			Item item = new Item();
			Double orgPrice = Double.parseDouble(faker.commerce().price());
			Double willingToPay = Double.parseDouble(faker.commerce().price());
			Float value = (float) ((willingToPay * 100) / orgPrice);

			item.setName(faker.commerce().productName());
			item.setPublishDate(faker.date().past(50, TimeUnit.DAYS));
			item.setUser(user);
			item.setQuality(faker.commerce().color());
			item.setOrgPrice(orgPrice);
			item.setWillingToPay(willingToPay);
			item.setValue(value);
			item.setDescription(faker.lorem().paragraph());
			item.setCategory(faker.commerce().material());
			_itemRepository.save(item);
		}
		return this;
	}
}
