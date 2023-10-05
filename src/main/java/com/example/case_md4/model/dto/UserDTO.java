package com.example.case_md4.model.dto;

import com.example.case_md4.model.Address;
import com.example.case_md4.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    // DTO: Data Transfer Object
    private Long id;
    private String name;
    private Role role;
    private String email;
    private boolean isDelete;
    private Address address_delivery;
}
