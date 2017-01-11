package org.sharelost.spark.persistence.users;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class User {


	@Id
	public Long _id;
	public String _name;
	public String _password;

	public User() {
	}

	public User(Long id, String name, String password) {
		_id = id;
		_name = name;
		_password = password;
	}

	@Override
	public String toString(){
		return _name + _id;
	}
}
