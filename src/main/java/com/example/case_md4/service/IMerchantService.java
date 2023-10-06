package com.example.case_md4.service;

import com.example.case_md4.model.Merchant;

import java.util.List;

public interface IMerchantService extends IGenerateService<Merchant>{

  void  delete (Long id_merchant);
  Merchant findOneByAndAccount(Long id_account );
  List<Merchant> findAllByNameProduct(String name);

}
