package org.sharelost.spark.persistence.items;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.sharelost.spark.persistence.Persistence;

public class ItemRepository {

	private SessionFactory _sessionFactory;

	public ItemRepository() {
	}

	public SessionFactory getOrCreateSessionFactory() {
		if (_sessionFactory == null) {
			_sessionFactory = Persistence.getInstance().getSessionFactory();
		}
		return _sessionFactory;
	}

	public SessionFactory getSessionFactory() {
		return _sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		_sessionFactory = sessionFactory;
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
