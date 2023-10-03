package com.example.case_md4.repository;

import com.example.case_md4.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepository extends JpaRepository<Account, Long> {
    Account findByName(String username);
}
