package com.example.case_md4.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_cart;
    @ManyToOne
    private Account account;
    @ManyToOne
    private Merchant merchant;
}
