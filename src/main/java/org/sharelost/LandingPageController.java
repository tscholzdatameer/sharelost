package org.sharelost;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LandingPageController {

	@RequestMapping(value = "/", produces = "application/json")
	public String index() {
		return "Index page ShareLost";
	}

}