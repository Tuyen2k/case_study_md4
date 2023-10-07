package com.example.case_md4.controller;
import com.example.case_md4.model.*;
import com.example.case_md4.model.dto.UserDTO;
import com.example.case_md4.repository.IRoleRepository;
import com.example.case_md4.service.*;
import com.example.case_md4.service.iplm.ProductServiceImpl;
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
    @Autowired
    IUserService userService;
    @Autowired
    IRoleService roleService;

    @Value("${upload.path}")
    private String upload;

    @GetMapping
    public ResponseEntity<List<Product>> findAllProducts() {
        return new ResponseEntity<>(iProductService.findAll(), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        if (iProductService.findById(id) != null) {
            iProductService.delete(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> finById(@PathVariable Long id) {
        if (iProductService.findById(id) != null) {
            return new ResponseEntity<>(iProductService.findById(id), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/update")
    public ResponseEntity<?> update(@RequestPart("product") Product product,
                                    @RequestPart(value = "file", required = false)
                                    MultipartFile file) {
        Product p = iProductService.findById(product.getId_product());
        p.setName(product.getName());
        p.setPrice(product.getPrice());
        p.setPrice_sale(product.getPrice() * 0.95);
        p.setCategory(product.getCategory());
        p.setStatus(product.isStatus());
        product = p;
        if (file.getSize() != 0) {
            String name = file.getOriginalFilename();
            try {
                FileCopyUtils.copy(file.getBytes(), new File(upload + name));
            } catch (Exception e) {
                e.printStackTrace();
            }
            product.setImage(name);
        } else {
            if (Objects.equals(product.getId_product(), null)) {
                product.setImage("do_an_mac_dinh.jpg");
            }
        }
        iProductService.save(product);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestPart("product") Product product,
                                    @RequestPart(value = "file", required = false)
                                    MultipartFile file) {
        double price_sale = product.getPrice() * 0.95;
        product.setPrice_sale(price_sale);
        Merchant merchant = merchantService.findById(product.getMerchant().getId_merchant());
        product.setMerchant(merchant);
        product.setStatus(true);
        if (file.getSize() != 0) {
            String name = file.getOriginalFilename();
            try {
                FileCopyUtils.copy(file.getBytes(), new File(upload + name));
            } catch (Exception e) {
                e.printStackTrace();
            }
            product.setImage(name);
        } else {
            if (Objects.equals(product.getId_product(), null)) {
                product.setImage("do_an_mac_dinh.jpg");
            }
        }
        iProductService.save(product);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/showProduct/{id}")
    public ResponseEntity<List<Product>> showProductInMerchant(@PathVariable Long id) {
        List<Product> products = productService.getProductInMerchant(id);
        if (!products.isEmpty()) {
            return new ResponseEntity<>(products, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getCategory")
    public ResponseEntity<List<Category>> getCategory() {
        return new ResponseEntity<>(categoryService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<List<Product>> displayNewProduct() {
        return new ResponseEntity<>(productService.displayNewProduct(), HttpStatus.OK);
    }

    @GetMapping("/highsales")
    public ResponseEntity<List<Product>> displayBySales() {
        return new ResponseEntity<>(productService.displayHighSales(), HttpStatus.OK);
    }

    @PostMapping("/checkAccMerchant")
    public ResponseEntity<List<Product>> getListProductInAccMerchant
            (@RequestBody Account account) {
        if (account.getRole().getId() == 3){
        Merchant merchant = productService.checkMerchant(account.getId_account());
        List<Product> products = productService.getProductInMerchant(merchant.getId_merchant());
        if (!products.isEmpty()) {
            return new ResponseEntity<>(products, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    } else {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}

    @PostMapping("/checkAccUser/{indexMerchant}")
    public ResponseEntity<List<Product>> getListProductInAccUser
            (@PathVariable Long indexMerchant) {
        List<Product> products = productService.getProductInMerchant(indexMerchant);
        if (!products.isEmpty()){
            return new ResponseEntity<>(products,HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}

