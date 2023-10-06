package com.example.case_md4.repository;

import com.example.case_md4.model.CartDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ICartDetailRepository extends JpaRepository<CartDetail, Long> {
    @Query(nativeQuery = true, value = "select * from cart_detail where product_id_product = ?;")
    CartDetail findByProduct(Long id_product);
}
