package org.sharelost.indexPage;

import java.util.HashMap;
import java.util.Map;

import org.sharelost.spark.persistence.items.ItemRepository;

import spark.Request;
import spark.Response;
import spark.Route;

public class IndexController {

	private static ItemRepository _itemRepository;

	public static Route serveIndexPage = (Request request, Response response) -> {
		Map<String, Object> model = new HashMap<>();
		model.put("items", _itemRepository.findAllItems());
		throw new UnsupportedOperationException();
		// return "TODO: return json of all items...";
	};
}
