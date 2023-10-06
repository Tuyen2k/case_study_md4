package com.example.case_md4.service.iplm;

import com.example.case_md4.model.Merchant;
import com.example.case_md4.model.Product;
import com.example.case_md4.repository.IProductRepository;
import com.example.case_md4.service.IMerchantService;
import com.example.case_md4.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class ProductServiceImpl implements IProductService {
    @Autowired
    IProductRepository productRepository;
    @Autowired
    IMerchantService merchantService;
    @Override
    public List<Product> findAll() {
        List<Product> products = productRepository.findAll();
        List<Product> newList = new ArrayList<>();
        for (Product p : products) {
            if (!p.isDelete()){
                newList.add(p);
            }
        } return newList;
    }

    @Override
    public Product findById(Long id) {
        if (productRepository.findById(id).isPresent()
                && !productRepository.findById(id).get().isDelete()
                && productRepository.findById(id).get().isStatus()){
            return productRepository.findById(id).get();
        } else {
            return null;
        }
    }

    @Override
    public void save(Product product) {
        productRepository.save(product);
    }

    @Override
    public void delete(Long id) {
       Product product = findById(id);
       product.setDelete(true);
       productRepository.save(product);
    }

    public List<Product> getProductInMerchant(Long id){
        List<Product> products = new ArrayList<>();
        for (Product p: findAll()) {
            if (p.getMerchant().getId_merchant().equals(id) && p.isStatus()){
                if (!p.isDelete()){
                    products.add(p);
                }
            }
        } return products;
    }
}
