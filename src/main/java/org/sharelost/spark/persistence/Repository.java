package org.sharelost.spark.persistence;

import org.hibernate.SessionFactory;

public abstract class Repository {

	protected SessionFactory _sessionFactory;

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
}
