package org.sharelost.user;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Required;
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
    
    @NotNull(message = "Name is required")
    @Column(name = "_name")
    private String name;
    
    @NotNull(message = "Password is required")
    @Column(name = "_password")
    private String password;

    @NotNull(message = "Email is required")
    @Column(unique = true, name = "_email", length = 500)
    private String email;

    @Column(name = "_registrationDate")
    private Date registrationDate;

    @Override
    public String toString() {
        return "'" + name + "'(" + email + ")[" + id + "]";
    }

}
