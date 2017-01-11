package org.sharelost.spark;

import org.sharelost.spark.persistence.Injector;
import org.sharelost.spark.persistence.users.UserController;

import static spark.Spark.get;

public class SparkApplication {
	public static void main(String[] args) {
		Injector.injectUsers();

		get("/hello", (req, res) -> "Hello World");

		get("/users", (req, res) -> UserController.showUsers().toString());
	}
}
