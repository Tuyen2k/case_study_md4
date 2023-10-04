package com.example.case_md4.repository;

import com.example.case_md4.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface IAddressRepository extends JpaRepository<Address,Long> {
    @Query(nativeQuery = true, value = "select * from address order by id_address desc limit 1;")
    Address findLast();
}
