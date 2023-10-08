package com.example.case_md4.jwt.service;

import com.example.case_md4.model.Address;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Getter
@Setter
public class JwtResponse {

    private Long id;
    private String token;
    private String type = "Bearer";
    private String username;
    private String name;
    private final Collection<? extends GrantedAuthority> authorities;
    private Address address;

    public JwtResponse(Long id, String token, String username, String name, Collection<? extends GrantedAuthority> authorities, Address address) {
        this.id = id;
        this.token = token;
        this.username = username;
        this.name = name;
        this.authorities = authorities;
        this.address = address;
    }
}
