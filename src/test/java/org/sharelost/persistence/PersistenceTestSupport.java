package org.sharelost.persistence;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.hibernate.query.Query;

public class PersistenceTestSupport {

	private static SessionFactory _sessionFactory = buildSessionFactoryIfNotExists();

	private static SessionFactory buildSessionFactoryIfNotExists() {
		try {
			if (_sessionFactory == null) {
				Configuration configuration = new Configuration()
						.configure(PersistenceTestSupport.class.getResource("/test.hibernate.configuration.xml"));
				_sessionFactory = configuration.buildSessionFactory();
			}
			return _sessionFactory;
		} catch (Throwable ex) {
			System.err.println("Initial SessionFactory creation failed." + ex);
			throw new ExceptionInInitializerError(ex);
		}
	}

	public static SessionFactory getSessionFactory() {
		return _sessionFactory;
	}

	public static void shutdown() {
		getSessionFactory().close();
	}

	public static int deleteAllUsers() {
		Session session = getSessionFactory().openSession();
		String stringQuery = "DELETE FROM User";
		Transaction transaction = session.beginTransaction();
		Query query = session.createQuery(stringQuery);
		int result = query.executeUpdate();
		transaction.commit();
		return result;
	}

	public static void deleteAllItems() {
		Session session = getSessionFactory().openSession();
		String stringQuery = "DELETE FROM Item";
		Transaction transaction = session.beginTransaction();
		Query query = session.createQuery(stringQuery);
		query.executeUpdate();
		transaction.commit();
	}
}
