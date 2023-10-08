package com.example.case_md4.service;

import com.example.case_md4.model.Merchant;

import java.util.List;

public interface IMerchantService extends IGenerateService<Merchant>{

  List<Merchant> findAllMerchant();
  void  delete (Long id_merchant);
  Merchant findOneByAndAccount(Long id_account );
  List<Merchant> findAllByNameProduct(String name);

  List<Merchant> findAllByCategory(Long id);
  List<Merchant> filterMerchant(String name, Double price1, Double price2, List<Long>categories );
  List<Merchant> findSearch(String name, Double minPrice, Double maxPrice, Long categoryId);

}
