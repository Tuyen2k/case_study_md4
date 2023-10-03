package com.example.case_md4.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_address;
    @ManyToOne
    private City city;
    @ManyToOne
    private District district;
    @ManyToOne
    private Ward ward;
    private String address_detail;
}
