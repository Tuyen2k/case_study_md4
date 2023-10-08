package com.example.case_md4.repository;

import com.example.case_md4.model.Category;
import com.example.case_md4.model.Merchant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface IMerchantRepository extends JpaRepository<Merchant,Long> {
    @Query(value = "select * from merchant where activity_id_activity = 1 and is_delete =false",nativeQuery = true)
    List<Merchant> findAllByActivity();
    @Query(value ="select * from merchant where account_id_account = ?",nativeQuery = true )

    Merchant findOneByAndAccount(Long id_account );
    @Query(value = "select m.* from product as p join merchant as m on p.merchant_id_merchant = m.id_merchant where p.name like ? group by m.id_merchant;",nativeQuery = true)
    List<Merchant> findAllByNameProduct(String name);
    @Query(value = "SELECT m.*, p.name FROM product p JOIN merchant m ON p.merchant_id_merchant = m.id_merchant WHERE p.category_id_category = ?",nativeQuery = true)
    List<Merchant> findAllByCategory(Long id);
    @Query(value = "SELECT m.* from  merchant as m join product as p " +
            "on m.id_merchant = p.merchant_id_merchant join category as c " +
            "on p.category_id_category = c.id_category where p.name like %?% and" +
            " p.price between ? and ? and p.category_id_category IN (:categories) group by m.id_merchant",nativeQuery = true)
    List<Merchant>FindSearch(String name,Double price1,Double price2,List<Long> categories );

    @Query(value = "SELECT m.* FROM merchant AS m " +
            "JOIN product AS p ON m.id_merchant = p.merchant_id_merchant " +
            "JOIN category AS c ON p.category_id_category = c.id_category " +
            "WHERE (p.name LIKE CONCAT('%', ?1, '%') OR ?1 IS NULL) " +
            "AND (p.price BETWEEN ?2 AND ?3 OR ?2 IS NULL OR ?3 IS NULL) " +
            "AND (p.category_id_category = ?4 OR ?4 IS NULL) " +
            "GROUP BY m.id_merchant",
            nativeQuery = true)
    List<Merchant> findSearch(String name, Double minPrice, Double maxPrice, Long categoryId);
}
