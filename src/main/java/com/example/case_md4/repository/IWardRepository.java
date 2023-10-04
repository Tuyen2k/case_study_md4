package com.example.case_md4.repository;

import com.example.case_md4.model.District;
import com.example.case_md4.model.Ward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IWardRepository extends JpaRepository<Ward, Long> {
    List<Ward> findAllByDistrict(District district);
}
