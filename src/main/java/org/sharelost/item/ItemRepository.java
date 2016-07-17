package org.sharelost.item;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

public interface ItemRepository extends PagingAndSortingRepository<Item, Long> {

	public Item findByName(@Param("name") String name);

	public List <Item> findByCategory(@Param("category") String category);

	public List <Item> findTop10ByOrderByValueDesc();
	
	/* [TODO] get an "PersistentEntity must not be null!" exception
	@Query(value = "SELECT DISTINCT _category FROM ITEM", nativeQuery = true)
	public List <String> findCategories();
	*/
	
	@Query(value = "SELECT count(id) > 0 FROM Item")
	public boolean existsAtAll();

}
