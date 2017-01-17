package org.sharelost.spark.persistence.items;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Item {

	@Id
	@Column(name = "id")
	@GeneratedValue
	public Long _id;
	@Column(name = "name")
	public String _name;

	public Item() {
	}

	public Item(String name) {
		_name = name;
	}

	public String getName() {
		return _name;
	}

	public void setName(String name) {
		_name = name;
	}

	@Override
	public String toString() {
		return "Item [_id=" + _id + ", _name=" + _name + "]";
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
		Item other = (Item) obj;
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
