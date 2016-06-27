package org.sharelost.item;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.sharelost.user.User;
import org.springframework.hateoas.Identifiable;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@Table(name = "Item")
public class Item implements Identifiable<Long> {

    @Id
    @GeneratedValue
    @Column(name = "_itemId")
    private Long id;
    
    @Column(name = "_name")
    private String name;
    
    @ManyToOne
    private User user;
    
    @Column(name = "_description", length = 500)
    private String description;

    @Column(name = "_publishDate")
    private Date publishDate;
    
    @Column(name = "_quality")
    private String quality;
    
    @Column(name = "_orgPrice")
    private Double orgPrice;
    
    @Column(name = "_willingToPay")
    private Double willingToPay;
    
    @Column(name = "_value")
    private Float value;

}