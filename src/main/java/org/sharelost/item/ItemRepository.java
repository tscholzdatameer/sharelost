package org.sharelost.item;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

public interface ItemRepository extends PagingAndSortingRepository<Item, Long> {

	public Item findByName(@Param("name") String name);
	
	public Page <Item> findByUserId(@Param("userId") long userId, Pageable pageable);

	public Page <Item> findByCategory(@Param("category") String category, Pageable pageable);

	public Page <Item> findTop10ByOrderByValueDesc(Pageable pageable);
	
	public Page <Item> findByOrderByPublishDateDesc(Pageable pageable);
	
	public Page <Item> findByOrderByValueDesc(Pageable pageable);
	
	/* [TODO] get an "PersistentEntity must not be null!" exception
	@Query(value = "SELECT DISTINCT _category FROM ITEM", nativeQuery = true)
	public List <String> findCategories();
	*/
	
	@Query(value = "SELECT count(id) > 0 FROM Item")
	public boolean existsAtAll();

}
