package com.example.case_md4.model;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
public class Merchant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_merchant;
    @ManyToOne
    private Account account;
    @NotEmpty
    @Column(unique = true)
    private String name;
    @NotEmpty
    @Column(unique = true)
    private String phone;
    @NotEmpty
    @Column(unique = true)
    private String email;
    private LocalDateTime open_time;
    private LocalDateTime close_time;
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
