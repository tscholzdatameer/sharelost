package org.sharelost.user;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.hateoas.Identifiable;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@Table(name = "User")
public class User implements Identifiable<Long> {

    @Id
    @GeneratedValue
    @Column(name = "_userId")
    private Long id;
    
    @Column(name = "_name")
    private String name;

    @Column(unique = true, name = "_emailAddress", length = 500)
    private String emailAddress;

    @Column(name = "_registrationDate")
    private Date registrationDate;

    @Override
    public String toString() {
        return "'" + name + "'(" + emailAddress + ")[" + id + "]";
    }

}
