package com.example.case_md4.service;

import com.example.case_md4.model.Account;
import com.example.case_md4.model.dto.UserDTO;

public interface IUserService extends IGenerateService<Account> {
    Account findByUsername(String username);

    UserDTO  toDTO(Account account);

    UserDTO findOne(Long id);
}
