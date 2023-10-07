package com.example.case_md4.repository;

import com.example.case_md4.model.CartDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICartDetailRepository extends JpaRepository<CartDetail, Long> {
    @Query(nativeQuery = true, value = "select * from cart_detail where product_id_product = ?;")
    CartDetail findByProduct(Long id_product);

    @Query(nativeQuery = true, value = "select * from cart_detail where status_id_status = :id_status and cart_id_cart in :carts")
    List<CartDetail> findAllByCart(@Param("id_status")Long id_status, @Param("carts") List<Long> id_carts);


}
