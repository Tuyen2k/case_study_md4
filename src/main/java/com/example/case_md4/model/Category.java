package com.example.case_md4.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_category;
    @Column(unique = true)
    private String name;
}
