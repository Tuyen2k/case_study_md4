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
        Optional<Account> account = iUserRepository.findById(id);
        return account.orElse(null);
    }

    public Account findByUsername(String name) {
        return iUserRepository.findByName(name);
    }

    @Override
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

    public UserDTO toDTO(Account account) {
        return new UserDTO(account.getId_account(), account.getName(), account.getRole(), account.getEmail(), account.isDelete(), account.getAddress_delivery());
    }

    @Override
    public List<Account> findAll() {
        return iUserRepository.findAll();
    }

    public List<UserDTO> findAllDTO() {
        List<UserDTO> userDTOS = new ArrayList<>();
        List<Account> accounts = findAll();
        for (Account a : accounts) {
            if (!a.isDelete()){
                userDTOS.add(toDTO(a));
            }
        }
        return userDTOS;
    }

    @Override
    public UserDTO findOne(Long id) {
        Optional<Account> userOptional = iUserRepository.findById(id);
        return userOptional.map(this::toDTO).orElse(null);
    }

    @Override
    public void delete(Long id) {
        Account account = findById(id);
        account.setDelete(true);
        iUserRepository.save(account);
    }

}
