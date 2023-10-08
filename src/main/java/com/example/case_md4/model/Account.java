package com.example.case_md4.model;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Entity
@Data
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_account;
    @NotEmpty
    @Column(unique = true)
    private String name;
    @NotEmpty
    @Email
    @Column(unique = true)
    private String email;
    @NotEmpty
    private String password;
    private String phone;
    @NotEmpty
    private String confirm_password;
    @Column(nullable = false)
    @ColumnDefault("false")
    private boolean isDelete;
    @ManyToOne
    private Role role;
    @ManyToOne
    private Address address_delivery;
}
