package org.sharelost.spark.persistence;

import org.hibernate.Session;
import org.sharelost.spark.persistence.users.User;

public class Injector {

	private static final String COUNT_USERS = "select count(*) from User";

	public static void injectUsers() {
		Session session = Persistence.getInstance().getSessionFactory().openSession();
		if (((Long) session.createQuery(COUNT_USERS).iterate().next()).longValue() == 0L) {
			session.beginTransaction();
			session.save(new User("gustav", "ganz"));
			session.getTransaction().commit();
		}
		session.close();
	}
}
