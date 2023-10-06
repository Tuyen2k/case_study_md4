package com.example.case_md4.controller;
import com.example.case_md4.model.Category;
import com.example.case_md4.model.Merchant;
import com.example.case_md4.model.Product;
import com.example.case_md4.service.ICategoryService;
import com.example.case_md4.service.IMerchantService;
import com.example.case_md4.service.IProductService;
import com.example.case_md4.service.iplm.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
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
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    IProductService iProductService;
    @Autowired
    ProductServiceImpl productService;
    @Autowired
    IMerchantService merchantService;
    @Autowired
    ICategoryService categoryService;

    @Value("${upload.path}")
    private String upload;
    @GetMapping
    public ResponseEntity<List<Product>> findAllProducts(){
        return new ResponseEntity<>(iProductService.findAll(), HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id){
        if (iProductService.findById(id) != null) {
            iProductService.delete(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> finById(@PathVariable Long id){
        if (iProductService.findById(id) != null){
            return new ResponseEntity<>(iProductService.findById(id), HttpStatus.OK);
        } else {
         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/update")
    public ResponseEntity<?> update(@RequestPart("product") Product product,
                                  @RequestPart(value = "file" , required = false)
                                  MultipartFile file){
        Product p = iProductService.findById(product.getId_product());
            p.setName(product.getName());
            p.setPrice(product.getPrice());
            p.setPrice_sale(product.getPrice() * 0.95);
            p.setCategory(product.getCategory());
            p.setStatus(product.isStatus());
            product = p;
        if (file.getSize() != 0){
            String name = file.getOriginalFilename();
            try {
                FileCopyUtils.copy(file.getBytes(), new File(upload + name));
            }catch (Exception e){
                e.printStackTrace();
            }
            product.setImage(name);
        } else {
            if (Objects.equals(product.getId_product(), null)){
                product.setImage("do_an_mac_dinh.jpg");
            }
        }
        iProductService.save(product);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestPart("product") Product product,
                                  @RequestPart(value = "file" , required = false)
                                  MultipartFile file){
            double price_sale = product.getPrice() * 0.95;
            product.setPrice_sale(price_sale);
            Merchant merchant = merchantService.findById(product.getMerchant().getId_merchant());
            product.setMerchant(merchant);
            product.setStatus(true);
        if (file.getSize() != 0){
            String name = file.getOriginalFilename();
            try {
                FileCopyUtils.copy(file.getBytes(), new File(upload + name));
            }catch (Exception e){
                e.printStackTrace();
            }
            product.setImage(name);
        } else {
            if (Objects.equals(product.getId_product(), null)){
                product.setImage("do_an_mac_dinh.jpg");
            }
        }
        iProductService.save(product);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/showProduct/{id}")
    public ResponseEntity<List<Product>> showProductInMerchant(@PathVariable Long id){
        List<Product> products = productService.getProductInMerchant(id);
        if (!products.isEmpty()){
            return new ResponseEntity<>(products,HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/getCategory")
    public ResponseEntity<List<Category>> getCategory(){
        return new ResponseEntity<>(categoryService.findAll(), HttpStatus.OK);
    }
}
