package com.example.case_md4.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class CartDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_cartDetail;
    @ManyToOne
    private Cart cart;
    @ManyToOne
    private Product product;
    private int quantity;
    private double price;
    @ManyToOne
    private Status status;
}
