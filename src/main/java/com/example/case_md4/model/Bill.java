package com.example.case_md4.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_bill;
    @ManyToOne
    private Account account;
}
