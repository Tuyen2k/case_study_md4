package com.example.case_md4.model;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.time.LocalTime;

@Entity
@Data
public class Merchant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_merchant;
    @ManyToOne
    private Account account;

    @Column(unique = true)
    private String name;

    @Column(unique = true)
    private String phone;

    @Column(unique = true)
    private String email;
    private LocalTime open_time;
    private LocalTime close_time;

    @Column(nullable = false)
    @ColumnDefault("false")
    private boolean isDelete;

    @ManyToOne
    private Activity activity;
    @ManyToOne
    private Address address_shop;
    private String image;

    @Transient
    private MultipartFile file;
}
