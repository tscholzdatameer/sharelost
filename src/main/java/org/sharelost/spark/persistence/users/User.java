package org.sharelost.spark.persistence.users;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class User {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	public Long _id;
	@Column(name = "name")
	public String _name;
	@Column(name = "password")
	public String _hashedPassword;

	@Column(name = "salt")
	public String _salt;

	public User() {
		_salt = UUID.randomUUID().toString();
	}

	public User(String name, String hashedPassword) {
		_name = name;
		_hashedPassword = hashedPassword;
	}

	public Long getId() {
		return _id;
	}

	public String getName() {
		return _name;
	}

	public String getHashedPassword() {
		return _hashedPassword;
	}

	public void setId(Long id) {
		_id = id;
	}

	public void setName(String name) {
		_name = name;
	}

	public void setHashedPassword(String hashedPassword) {
		_hashedPassword = hashedPassword;
	}

	public String getSalt() {
		return _salt;
	}

	public void setSalt(String salt) {
		_salt = salt;
	}

	@Override
	public String toString(){
		return _name + _id;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((_id == null) ? 0 : _id.hashCode());
		result = prime * result + ((_name == null) ? 0 : _name.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		if (_id == null) {
			if (other._id != null)
				return false;
		} else if (!_id.equals(other._id))
			return false;
		if (_name == null) {
			if (other._name != null)
				return false;
		} else if (!_name.equals(other._name))
			return false;
		return true;
	}

}
