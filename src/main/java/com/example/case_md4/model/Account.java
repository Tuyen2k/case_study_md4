package com.example.case_md4.model;

import lombok.Data;

import javax.persistence.*;
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
    @Column(unique = true)
    private String email;
    @NotEmpty
    private String password;
    @NotEmpty
    private String confirm_password;
    @ManyToOne
    private Role role;
    @ManyToOne
    private Address address_delivery;
}
