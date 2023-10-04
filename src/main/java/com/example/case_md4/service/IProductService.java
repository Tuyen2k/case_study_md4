package com.example.case_md4.service;

import com.example.case_md4.model.Product;
import org.springframework.stereotype.Service;

import java.util.List;
public interface IProductService extends IGenerateService<Product> {
    @Override
    List<Product> findAll();

    @Override
    Product findById(Long id);

    @Override
    void save(Product product);

    void delete(Long id);
}
