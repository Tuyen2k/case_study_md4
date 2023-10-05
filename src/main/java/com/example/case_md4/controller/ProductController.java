package com.example.case_md4.controller;
import com.example.case_md4.model.Product;
import com.example.case_md4.service.IProductService;
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

    @PostMapping("/{id}")
    public ResponseEntity<Product> update(@PathVariable Long id){
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


}
