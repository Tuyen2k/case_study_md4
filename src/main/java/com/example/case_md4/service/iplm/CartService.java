package com.example.case_md4.service.iplm;

import com.example.case_md4.model.Cart;
import com.example.case_md4.repository.ICartRepository;
import com.example.case_md4.service.ICartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService implements ICartService {
    @Autowired
    private ICartRepository cartRepository;
    @Override
    public List<Cart> findAll() {
        return cartRepository.findAll();
    }

    @Override
    public Cart findById(Long id) {
        return cartRepository.findById(id).orElse(null);
    }

    @Override
    public void save(Cart cart) {
        cartRepository.save(cart);
    }

    @Override
    public List<Cart> findByAccount(Long id_account) {
        return cartRepository.findByAccount(id_account);
    }

    @Override
    public Cart findLast() {
        return cartRepository.findLast();
    }
}
