package org.sharelost.persistence;

import org.hibernate.SessionFactory;
import org.junit.Test;
import org.sharelost.spark.persistence.Persistence;
import org.sharelost.spark.persistence.Repository;

import static org.assertj.core.api.Assertions.assertThat;

public class RepositoryTest {

	@Test
	public void testgetOrCreateSessionFactory_getCachedSession() {
		Repository repo = new Repository() {
		};
		SessionFactory sessionFactory = Persistence.getInstance().getSessionFactory();
		repo.setSessionFactory(sessionFactory);
		assertThat(repo.getOrCreateSessionFactory()).isEqualTo(sessionFactory);
		assertThat(repo.getSessionFactory()).isEqualTo(sessionFactory);
	}

	@Test
	public void testgetOrCreateSessionFactory_getNewSession() {
		Repository repo = new Repository() {
		};
		repo.setSessionFactory(null);
		assertThat(repo.getSessionFactory()).isNull();
		assertThat(repo.getOrCreateSessionFactory()).isNotNull();
		assertThat(repo.getSessionFactory()).isNotNull();
	}
}
