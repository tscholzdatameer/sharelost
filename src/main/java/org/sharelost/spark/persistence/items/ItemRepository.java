package org.sharelost.spark.persistence.items;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.sharelost.spark.persistence.Repository;

public class ItemRepository extends Repository {

	public ItemRepository() {
	}

	public void save(Item item) {
		Session session = getOrCreateSessionFactory().openSession();
		session.beginTransaction();
		session.save(item);
		session.getTransaction().commit();
	}

	public List<Item> findAllItems() {
		SessionFactory sessionFactory = getOrCreateSessionFactory();
		Criteria criteria = sessionFactory.openStatelessSession().createCriteria(Item.class);
		return (List<Item>) criteria.list();
	}
}
