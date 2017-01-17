package org.sharelost.spark;

import static spark.debug.DebugScreen.enableDebugScreen;

import org.sharelost.indexPage.IndexController;
import org.sharelost.indexPage.LoginController;
import org.sharelost.spark.persistence.Injector;
import org.sharelost.spark.persistence.users.UserController;
import org.sharelost.spark.util.Filters;
import org.sharelost.spark.util.JsonUtil;

import static spark.Spark.after;
import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.staticFiles;

public class SparkApplication {
	public static void main(String[] args) {

		configureWebFrameworkSpark();

		Injector.injectUsers();

		get(RoutePath.INDEX, IndexController.serveIndexPage);

		get(RoutePath.LOGIN, LoginController.serveLoginPage);
		post(RoutePath.LOGIN, LoginController.handleLoginPost);
		post(RoutePath.LOGOUT, LoginController.handleLogoutPost);

		get("/hello", (req, res) -> "Hello World");

		get("/users", (req, res) -> UserController.showUsers().toString());

		get("/usersWithJackons", (request, response) -> {
			response.status(200);
			response.type("application/json");
			return JsonUtil.dataToJson(UserController.allUsers().toString());
		});

		// Set up after-filters (called after each get/post)
		after("*", Filters.addGzipHeader);
	}

	private static void configureWebFrameworkSpark() {
		port(4567);
		staticFiles.location("/public");
		staticFiles.expireTime(600L);
		enableDebugScreen();
	}
}
