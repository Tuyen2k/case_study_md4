package com.example.case_md4.service.iplm;

import com.example.case_md4.model.Account;
import com.example.case_md4.model.UserPrinciple;
import com.example.case_md4.model.dto.UserDTO;
import com.example.case_md4.repository.IUserRepository;
import com.example.case_md4.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserDetailsService, IUserService {

    @Autowired
    private IUserRepository iUserRepository;

    public Account findById(Long id) {
        return null;
    }

    public Account findByUsername(String name) {
        return iUserRepository.findByName(name);
    }

    public void save(Account account) {
        iUserRepository.save(account);
    }

    public UserDetails loadUserByUsername(String username) {
        Account user = findByUsername(username);
        if (user != null) {
            return UserPrinciple.build(user);
        }
        return null;
    }

    public UserDTO toDTO(Account user) {
        return new UserDTO(user.getId_account(), user.getName(), user.getRole());
    }

    @Override
    public List<Account> findAll() {
        return iUserRepository.findAll();
    }
    public List<UserDTO> findAllDTO() {
        List<UserDTO> userDTOS = new ArrayList<>();
        List<Account> accounts = findAll();
        for (Account a : accounts) {
            userDTOS.add(toDTO(a));
        }
        return userDTOS;
    }

    @Override
    public UserDTO findOne(Long id) {
        Optional<Account> userOptional = iUserRepository.findById(id);
        return userOptional.map(this::toDTO).orElse(null);
    }
}
