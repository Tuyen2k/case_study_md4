package com.example.case_md4.service.iplm;

import com.example.case_md4.model.CartDetail;
import com.example.case_md4.repository.ICartDetailRepository;
import com.example.case_md4.service.ICartDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartDetailService implements ICartDetailService {
    @Autowired
    private ICartDetailRepository cartDetailRepository;
    @Override
    public List<CartDetail> findAll() {
        return cartDetailRepository.findAll();
    }

    @Override
    public CartDetail findById(Long id) {
        return cartDetailRepository.findById(id).orElse(null);
    }

    @Override
    public void save(CartDetail cartDetail) {
        cartDetailRepository.save(cartDetail);
    }
    @Override
    public CartDetail findByProduct(Long id_product){
        return cartDetailRepository.findByProduct(id_product);
    }

    @Override
    public void delete(CartDetail cartDetail) {
        cartDetailRepository.delete(cartDetail);
    }

    @Override
    public List<CartDetail> findAllByCarts(Long id_status,List<Long> id_carts) {
        return cartDetailRepository.findAllByCart(id_status, id_carts);
    }
}
