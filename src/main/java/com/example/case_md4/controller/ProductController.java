package com.example.case_md4.controller;
import com.example.case_md4.model.Product;
import com.example.case_md4.service.IProductService;
import com.example.case_md4.service.iplm.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    IProductService iProductService;
    @Autowired
    ProductServiceImpl productService;


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

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestPart("product") Product product,
                                  @RequestPart(value = "file" , required = false)
                                  MultipartFile file){
//        if (file.getSize() != 0){
//            String name = file.getOriginalFilename();
//            try {
//                FileCopyUtils.copy(file.getBytes(), new File(upload + name));
//            }catch (Exception e){
//                e.printStackTrace();
//            }
//            product.setImage(name);
//        }
//        else {
//            if (Objects.equals(product.getId_product(), null)){
//                product.setImage("do_an_mac_dinh.jpg");
//            }
//        }
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
    @GetMapping("/list")
    public ResponseEntity<List<Product>> displayNewProduct(){
        return new ResponseEntity<>(productService.displayNewProduct(), HttpStatus.OK);
    }
    @GetMapping("/highsales")
    public ResponseEntity<List<Product>> displayBySales(){
        return new ResponseEntity<>(productService.displayHighSales(), HttpStatus.OK);
    }
}
