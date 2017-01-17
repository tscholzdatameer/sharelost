package org.sharelost.persistence.items;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.sharelost.persistence.PersistenceTestSupport;
import org.sharelost.spark.persistence.items.Item;
import org.sharelost.spark.persistence.items.ItemRepository;

import static org.assertj.core.api.Assertions.assertThat;

public class ItemRepositoryTest {

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
		PersistenceTestSupport.deleteAllItems();
		hibernateSession.close();
	}

	@Test
	public void testFindAll_OneItem() {
		ItemRepository itemRepository = new ItemRepository();
		itemRepository.setSessionFactory(factory);
		itemRepository.save(new Item("bla"));

		List<Item> allItems = itemRepository.findAllItems();
		assertThat(allItems.get(0)._name).isEqualTo("bla");
	}

	@Test
	public void testFindAll_Empty() {
		ItemRepository itemRepository = new ItemRepository();
		itemRepository.setSessionFactory(factory);

		List<Item> allItems = itemRepository.findAllItems();
		assertThat(allItems).isEmpty();
	}
}
