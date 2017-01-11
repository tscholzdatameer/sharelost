package org.sharelost.spark.persistence.users;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.sharelost.spark.persistence.Persistence;

public class UserRepository {

	public static User findUser(String name) {
		SessionFactory sessionFactory = Persistence.getInstance().getSessionFactory();
		Criteria criteria = sessionFactory.openStatelessSession().createCriteria(User.class);
		criteria.add(Restrictions.eq("_name", name));
		return (User) criteria.uniqueResult();
	}

	public static void persistUser(User user) {
		Session session = Persistence.getInstance().getSessionFactory().openSession();
		session.beginTransaction();
		session.save(user);
		session.getTransaction().commit();
	}
}
