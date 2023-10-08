package com.example.case_md4.service;

import com.example.case_md4.model.CartDetail;

import java.util.List;

public interface ICartDetailService extends IGenerateService<CartDetail> {
    CartDetail findByProduct(Long id_product, Long id_cart);
    void delete(CartDetail cartDetail);

    List<CartDetail> findAllByCarts(Long id_status ,List<Long> id_carts);
}
