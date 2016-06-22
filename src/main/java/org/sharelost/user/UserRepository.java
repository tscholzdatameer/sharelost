package org.sharelost.user;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends PagingAndSortingRepository<User, Long> {

	@Query
	public User findByName(@Param("name") String name);

	@Query(value = "SELECT count(id) > 0 FROM User")
	public boolean existsAtAll();
}
