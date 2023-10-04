package com.example.case_md4.controller;

import com.example.case_md4.model.Merchant;
import com.example.case_md4.service.IMerchantService;
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

    @GetMapping
    public ResponseEntity<List<Merchant>> findAll() {
        return new ResponseEntity<>(merchantService.findAll(), HttpStatus.OK);
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
                merchant.setImage("fall-8192375_640.png");
            }
        }
        merchantService.save(merchant);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("activity/{activity_id_activity}")
    public ResponseEntity<List<Merchant>> findAll(@PathVariable Long activity_id_activity) {
        return new ResponseEntity<>(merchantService.findAllByActivity(activity_id_activity), HttpStatus.OK);
    }
    @DeleteMapping("{id_merchant}")
    public ResponseEntity<Void> delete (@PathVariable Long id_merchant ){
        Merchant merchant = merchantService.findById(id_merchant);
        if(merchant != null){
            merchantService.delete(id_merchant);
            return  new ResponseEntity<>(HttpStatus.OK);
        }
        return  new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
