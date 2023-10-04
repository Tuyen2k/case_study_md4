package com.example.case_md4.model;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Entity
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_product;
    @ManyToOne
    private Merchant merchant;
    @NotEmpty
    @Column(unique = true)
    private String name;
    private double price;
    private double price_sale;
    private String image;
    @Transient
    private MultipartFile file;
    @Column(nullable = false)
    @ColumnDefault("false")
    private boolean isDelete;
    @ManyToOne
    private Category category;
    @ColumnDefault("0")
    private int view;
    @ColumnDefault("0")
    private int purchase;
    @Column(nullable = false)
    @ColumnDefault("true")
    private boolean status;

}
