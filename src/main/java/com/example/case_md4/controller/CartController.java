package com.example.case_md4.controller;

import com.example.case_md4.model.*;
import com.example.case_md4.service.*;
import com.example.case_md4.service.iplm.CartDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/carts")
public class CartController {
    @Autowired
    private ICartService iCartService;
    @Autowired
    private ICartDetailService iCartDetailService;
    @Autowired
    private IMerchantService iMerchantService;
    @Autowired
    private IUserService iUserService;
    @Autowired
    private IProductService iProductService;

    @GetMapping
    public ResponseEntity<List<CartDetail>> findAllCartDetail() {
        return ResponseEntity.ok(iCartDetailService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CartDetail> findCartDetailById(@PathVariable("id") Long id_cartDetail) {
        return ResponseEntity.ok(iCartDetailService.findById(id_cartDetail));
    }

    @PostMapping("/save/{id_account}")
    public ResponseEntity<Void> save(@RequestBody CartDetail cartDetail,
                                     @PathVariable Long id_account) {
        List<Cart> carts = iCartService.findByAccount(id_account);
        Product product = iProductService.findById(cartDetail.getProduct().getId_product());
        Cart cart = null;
        // cart chưa có
        if (carts.isEmpty()) {
            //tạo mới cart
            Account account = iUserService.findById(id_account);
            Merchant merchant = iMerchantService.findById(product.getMerchant().getId_merchant());
            iCartService.save(new Cart(account, merchant));
            cart = iCartService.findLast();
        } else {                            //cart đã có

            boolean flag = false;
            for (Cart c : carts) {
                if (Objects.equals(c.getMerchant().getId_merchant(), product.getMerchant().getId_merchant())) {
                    flag = true;
                    cart = c;
                    break;
                }
            }                      //merchant cart = merchant_product
            if (flag) {
                CartDetail cartDetailDB = iCartDetailService.findByProduct(cartDetail.getProduct().getId_product());
                //product đã có trong cart_detail
                if (!Objects.equals(cartDetailDB, null)) {
                    //update quantity
                    cartDetail.setId_cartDetail(cartDetailDB.getId_cartDetail());
                    cartDetail.setQuantity(cartDetailDB.getQuantity() + cartDetail.getQuantity());
                }
            }
            //merchant cart != merchant_product
            else {                         //tạo mới cart
                Account account = iUserService.findById(id_account);
                Merchant merchant = iMerchantService.findById(product.getMerchant().getId_merchant());
                iCartService.save(new Cart(account, merchant));
                cart = iCartService.findLast();
            }
        }
        cartDetail.setCart(cart);
        iCartDetailService.save(cartDetail);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/user/update/{id_cart_detail}")
    public ResponseEntity<String> updateQuantity(@PathVariable Long id_cart_detail,
                                                 @RequestParam("quantity") int quantity) {
        CartDetail cartDetail = iCartDetailService.findById(id_cart_detail);
        if (Objects.equals(cartDetail, null)) {
            return ResponseEntity.ok("Not found!");
        } else {
            cartDetail.setQuantity(quantity);
            iCartDetailService.save(cartDetail);
            return ResponseEntity.ok("Update success");
        }
    }

    @DeleteMapping("/user/delete/{id_cart_detail}")
    public ResponseEntity<String> deleteCartDetail(@PathVariable Long id_cart_detail) {
        CartDetail cartDetail = iCartDetailService.findById(id_cart_detail);
        if (Objects.equals(cartDetail, null)) {
            return ResponseEntity.ok("Not found!");
        } else {
            iCartDetailService.delete(cartDetail);
            return ResponseEntity.ok("Delete success!");
        }
    }

    @GetMapping("/user/{id_account}")
    public ResponseEntity<?> findAllCartUser(@PathVariable Long id_account) {
        List<Cart> carts = iCartService.findByAccount(id_account);
        if (carts.isEmpty()) {
            return ResponseEntity.ok("Not found!");
        } else {
            List<Long> id_carts = new ArrayList<>();
            for (Cart c: carts){
                id_carts.add(c.getId_cart());
            }
           return ResponseEntity.ok(iCartDetailService.findAllByCarts(id_carts));
        }
    }

    @PostMapping("/user/status/{id_cart_detail}")
    public ResponseEntity<Void> updateStatus(@PathVariable Long id_cart_detail,
                                             @RequestBody Status status){
        CartDetail cartDetail = iCartDetailService.findById(id_cart_detail);
        if (Objects.equals(cartDetail, null)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        cartDetail.setStatus(status);
        iCartDetailService.save(cartDetail);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
