package org.sharelost.spark.persistence;


import org.hibernate.SessionFactory;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;

public class Persistence {

	private static Persistence _instance;

	private SessionFactory sessionFactory;

	private Persistence() {
		final StandardServiceRegistry registry = new StandardServiceRegistryBuilder().configure()
				.build();
		try {
			sessionFactory = new MetadataSources(registry).buildMetadata().buildSessionFactory();
		} catch (Exception e) {
			StandardServiceRegistryBuilder.destroy(registry);
			throw new RuntimeException(e);
		}
	}

	public static Persistence getInstance() {
		if (_instance == null) {
			_instance = new Persistence();
		}
		return _instance;
	}

	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void close() {
		if (sessionFactory != null) {
			sessionFactory.close();
		}
	}

}
