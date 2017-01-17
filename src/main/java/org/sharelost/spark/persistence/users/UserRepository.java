package org.sharelost.spark.persistence.users;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.StatelessSession;
import org.hibernate.criterion.Restrictions;
import org.sharelost.spark.persistence.Persistence;

public class UserRepository {

	private SessionFactory _sessionFactory;

	public UserRepository() {
		_sessionFactory = Persistence.getInstance().getSessionFactory();
	}

	public SessionFactory getSessionFactory() {
		return _sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		_sessionFactory = sessionFactory;
	}

	public  User findUser(String name) {
		SessionFactory sessionFactory = getSessionFactory();
		Criteria criteria = sessionFactory.openStatelessSession().createCriteria(User.class);
		criteria.add(Restrictions.eq("_name", name));
		return (User) criteria.uniqueResult();
	}

	public void saveUser(User user) {
		Session session = getSessionFactory().openSession();
		session.beginTransaction();
		session.save(user);
		session.getTransaction().commit();
	}

	public  List<User> findAllUsers() {
		SessionFactory sessionFactory = getSessionFactory();
		StatelessSession openStatelessSession = sessionFactory.openStatelessSession();
		Criteria criteria = openStatelessSession.createCriteria(User.class);
		return (List<User>) criteria.list();
	}
}
