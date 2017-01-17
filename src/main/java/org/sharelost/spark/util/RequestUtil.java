package org.sharelost.spark.util;

import spark.Request;

public class RequestUtil {

	public static String getQueryUsername(Request request) {
		return request.queryParams("u");
	}

	public static String getQueryPassword(Request request) {
		return request.queryParams("p");
	}

	public static String getQueryLoginRedirect(Request request) {
		return request.queryParams("loginRedirect");
	}

	public static boolean removeSessionAttrLoggedOut(Request request) {
		Object loggedOut = request.session().attribute("loggedOut");
		request.session().removeAttribute("loggedOut");
		return loggedOut != null;
	}

	public static String removeSessionAttrLoginRedirect(Request request) {
		String loginRedirect = request.session().attribute("loginRedirect");
		request.session().removeAttribute("loginRedirect");
		return loginRedirect;
	}

}
