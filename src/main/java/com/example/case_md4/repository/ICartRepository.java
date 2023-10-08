package com.example.case_md4.repository;

import com.example.case_md4.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICartRepository extends JpaRepository<Cart, Long> {

    @Query(nativeQuery = true, value = "select * from cart where account_id_account = ?;")
    List<Cart> findByAccount(Long id_account);
    @Query( nativeQuery = true, value = "select * from cart order by id_cart desc limit 1;")
    Cart findLast();
}
