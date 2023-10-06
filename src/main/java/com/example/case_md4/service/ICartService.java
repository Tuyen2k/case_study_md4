package com.example.case_md4.service;

import com.example.case_md4.model.Cart;

import java.util.List;

public interface ICartService extends IGenerateService<Cart>{
    List<Cart> findByAccount(Long id_account);
    Cart findLast();
}
