package com.example.case_md4.service.iplm;

import com.example.case_md4.model.Category;
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
    private IMerchantRepository merchantRepository;

    @Override
    public List<Merchant> findAll() {
        return merchantRepository.findAllByActivity();
    }

    @Override
    public Merchant findById(Long id_merchant) {
        if (merchantRepository.findById(id_merchant).isPresent()
                && !merchantRepository.findById(id_merchant).get().isDelete()) {
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

    public List<Merchant> findAllMerchant() {
        return merchantRepository.findAll();
    }

    public Merchant findOneByAndAccount(Long id_account) {
        Merchant merchant = merchantRepository.findOneByAndAccount(id_account);
        if (merchant != null) {
            return merchant;
        }
        return null;
    }

    @Override
    public List<Merchant> findAllByNameProduct(String name) {
        String search = "%" + name + "%";
        return merchantRepository.findAllByNameProduct(search);
    }


    @Override
    public List<Merchant> findAllByCategory(Long id) {
        return merchantRepository.findAllByCategory(id);
    }

    @Override
    public List<Merchant> filterMerchant(String name, Double price1, Double price2, List<Long> categories) {
        String str = '%'+name+'%';
        return merchantRepository.filterMerchant(str,price1,price2,categories);
    }

    @Override
    public List<Merchant> findSearch(String name, Double minPrice, Double maxPrice, Long categoryId) {
        return merchantRepository.findSearch(name,minPrice,maxPrice,categoryId);
    }

}
