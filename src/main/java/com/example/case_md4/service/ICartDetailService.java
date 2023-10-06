package com.example.case_md4.service;

import com.example.case_md4.model.CartDetail;

public interface ICartDetailService extends IGenerateService<CartDetail> {
    CartDetail findByProduct(Long id_product);
}
