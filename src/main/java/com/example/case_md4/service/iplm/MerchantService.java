package com.example.case_md4.service.iplm;

import com.example.case_md4.model.Merchant;
import com.example.case_md4.repository.IMerchantRepository;
import com.example.case_md4.service.IMerchantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MerchantService implements IMerchantService {
    @Autowired
    private IMerchantRepository merchantRepository ;
    @Override
    public List<Merchant> findAll() {
        return merchantRepository.findAllByActivity();
    }

    @Override
    public Merchant findById(Long id_merchant) {
        if (merchantRepository.findById(id_merchant).isPresent()
                && !merchantRepository.findById(id_merchant).get().isDelete()){
            return merchantRepository.findById(id_merchant).get();
        } else {
            return null;
        }
    }

    @Override
    public void save(Merchant merchant) {
      merchantRepository.save(merchant);
    }

    @Override
    public void delete(Long id_merchant) {
        Merchant merchant = findById(id_merchant);
        merchant.setDelete(true);
        merchantRepository.save(merchant);

}
}
