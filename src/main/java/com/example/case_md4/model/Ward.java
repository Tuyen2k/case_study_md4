package com.example.case_md4.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
@Data
public class Ward {
    @Id
    private Long id_ward;
    private String name;
    @ManyToOne
    private District district;
}
