package com.example.case_md4.repository;

import com.example.case_md4.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProductRepository extends JpaRepository<Product, Long> {
    @Query(
            value = "SELECT * FROM product p ORDER BY p.purchase DESC LIMIT 6",
            nativeQuery = true
    )
    List<Product> displayProductByPurchase();
}
