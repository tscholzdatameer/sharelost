package org.sharelost.user;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.hateoas.Identifiable;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@Table(name = "User")
//Tell Lombok to exclude the password beeing part of generated toString method 
@ToString(exclude = "_password")
public class User implements Identifiable<Long> {

	@Id
	@GeneratedValue
	@Column(name = "_userId")
	private Long id;

	@Column(unique = true, name = "_name")
	private String name;

	@Column(name="_password")
	private String _password;

	@Column(name = "_emailAddress", length = 500)
	private String emailAddress;

	@Column(name = "_registrationDate")
	private Long registrationDate;

}
