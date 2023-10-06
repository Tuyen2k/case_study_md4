package com.example.case_md4.repository;

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

}
