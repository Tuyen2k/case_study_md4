package com.example.case_md4.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
public class City {
    @Id
    private Long id_city;
    @Column(unique = true)
    private String name;
}
