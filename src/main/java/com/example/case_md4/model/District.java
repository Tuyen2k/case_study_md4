package com.example.case_md4.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
@Data
public class District {
    @Id
    private Long id_district;
    @Column(unique = true)
    private String name;
    @ManyToOne
    private City city;

}
