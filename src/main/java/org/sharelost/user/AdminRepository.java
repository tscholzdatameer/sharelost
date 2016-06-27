package org.sharelost.user;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface AdminRepository extends Repository<Admin, Long> {

	Admin save(Admin manager);

	Admin findByName(String name);

	@Query(value = "SELECT count(a) FROM Admin a")
	public long count();

}
