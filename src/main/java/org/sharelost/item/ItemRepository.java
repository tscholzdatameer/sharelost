package org.sharelost.item;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

public interface ItemRepository extends PagingAndSortingRepository<Item, Long> {

	@Query
	public Item findByName(@Param("name") String name);

	@Query(value = "SELECT count(id) > 0 FROM Item")
	public boolean existsAtAll();
	
	public List <Item> findTop10ByOrderByValueDesc();
	
}
