package com.example.case_md4.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
public class BillDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_billDetail;
    @ManyToOne
    private Product product;
    @ManyToOne
    private Bill bill;
    private int quantity;
    private double price;
    private LocalDateTime time_purchase;
}
