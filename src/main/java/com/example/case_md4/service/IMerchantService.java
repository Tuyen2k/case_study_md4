package com.example.case_md4.service;

import com.example.case_md4.model.Merchant;

import java.util.List;

public interface IMerchantService extends IGenerateService<Merchant>{
    List<Merchant> findAllByActivity( Long activity_id_activity);
  void  delete (Long id_merchant);
}
