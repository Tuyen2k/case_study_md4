package com.example.case_md4.controller;

import com.example.case_md4.model.Activity;
import com.example.case_md4.model.Address;
import com.example.case_md4.model.Merchant;
import com.example.case_md4.service.IMerchantService;
import com.example.case_md4.service.iplm.AddressServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.Objects;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/merchant")
public class MerchantController {
    @Autowired
    private IMerchantService merchantService;
    @Value("${upload.path}")
    private String upload;
    @Autowired
    private AddressServiceImpl addressService;

    @GetMapping
    public ResponseEntity<List<Merchant>> findAll() {
        return new ResponseEntity<>(merchantService.findAll(), HttpStatus.OK);
    }
    @GetMapping("/all")
    public ResponseEntity<List<Merchant>> findAllMerchant() {
        return new ResponseEntity<>(merchantService.findAllMerchant(), HttpStatus.OK);
    }

    @GetMapping("{id_merchant}")
    public ResponseEntity<Merchant> findById(@PathVariable Long id_merchant) {
        Merchant merchant = merchantService.findById(id_merchant);
        if (merchant != null) {
            return new ResponseEntity<>(merchant, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Void> save(@RequestPart(value = "merchant") Merchant merchant,
                                     @RequestPart(value = "file", required = false) MultipartFile file) {
        if (file.getSize() != 0) {
            String name = file.getOriginalFilename();
            try {
                FileCopyUtils.copy(file.getBytes(), new File(upload + name));
            } catch (Exception e) {
                e.printStackTrace();
            }
            merchant.setImage(name);
        } else {
            if (Objects.equals(merchant.getId_merchant(), null)) {
                merchant.setImage("do_an_mac_dinh.jpg");
            }
        }
        Address address = addressService.findAddressU(merchant.getAddress_shop().getCity().getId_city(),
                merchant.getAddress_shop().getDistrict().getId_district(),
                merchant.getAddress_shop().getWard().getId_ward(),
                merchant.getAddress_shop().getAddress_detail());
        if (address == null) {
            addressService.save(merchant.getAddress_shop());
            address = addressService.findLast();
        }
        merchant.setAddress_shop(address);
        merchantService.save(merchant);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("{id_merchant}")
    public ResponseEntity<Void> delete(@PathVariable Long id_merchant) {
        Merchant merchant = merchantService.findById(id_merchant);
        if (merchant != null) {
            merchantService.delete(id_merchant);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("account/{id_account}")
    public ResponseEntity<Merchant> findOneAccount(@PathVariable Long id_account) {
        Merchant merchant = merchantService.findOneByAndAccount(id_account);
        if (merchant != null) {
            return new ResponseEntity<>(merchant, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/activity/{id_merchant}")
    public ResponseEntity<Void> activityMerchant(@PathVariable Long id_merchant,
                                                 @RequestBody Activity activity){
        Merchant merchant = merchantService.findById(id_merchant);
        merchant.setActivity(activity);
        merchantService.save(merchant);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @GetMapping("/categories/{id_category}")
    public ResponseEntity<List<Merchant>> getAllByCategory(@PathVariable Long id_category) {
        return new ResponseEntity<>(merchantService.findAllByCategory(id_category), HttpStatus.OK);
    }


    @PostMapping("/search/{name}")
    public ResponseEntity<List<Merchant>> findAllByName(@PathVariable String name) {
        return new ResponseEntity<>(merchantService.findAllByNameProduct(name), HttpStatus.OK);
    }


}


