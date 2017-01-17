package org.sharelost.indexPage;

import static org.sharelost.spark.util.RequestUtil.getQueryLoginRedirect;
import static org.sharelost.spark.util.RequestUtil.getQueryPassword;
import static org.sharelost.spark.util.RequestUtil.getQueryUsername;
import static org.sharelost.spark.util.RequestUtil.removeSessionAttrLoggedOut;
import static org.sharelost.spark.util.RequestUtil.removeSessionAttrLoginRedirect;

import java.util.HashMap;
import java.util.Map;

import org.sharelost.spark.RoutePath;
import org.sharelost.spark.persistence.users.UserController;

import spark.Request;
import spark.Response;
import spark.Route;
public class LoginController {

	public static void ensureUserIsLoggedIn(Request request, Response response) {
		if (request.session().attribute("currentUser") == null) {
			request.session().attribute("loginRedirect", request.pathInfo());
			response.redirect(RoutePath.LOGIN);
		}
	};

	public static Route serveLoginPage = (Request request, Response response) -> {
		Map<String, Object> model = new HashMap<>();
		model.put("loggedOut", removeSessionAttrLoggedOut(request));
		model.put("loginRedirect", removeSessionAttrLoginRedirect(request));
		return "TODO: expose some login page";
	};

	public static Route handleLoginPost = (Request request, Response response) -> {
		Map<String, Object> model = new HashMap<>();
		if (!UserController.authenticate(getQueryUsername(request), getQueryPassword(request))) {
			model.put("authenticationFailed", true);
			return "TODO: failed authentication - render some failed login page";
		}
		model.put("authenticationSucceeded", true);
		request.session().attribute("currentUser", getQueryUsername(request));
		if (getQueryLoginRedirect(request) != null) {
			response.redirect(getQueryLoginRedirect(request));
		}
		return "TODO: successfull authentication - render redirect URL";
	};

	public static Route handleLogoutPost = (Request request, Response response) -> {
		request.session().removeAttribute("currentUser");
		request.session().attribute("loggedOut", true);
		response.redirect(RoutePath.LOGIN);
		return null;
	};
}
