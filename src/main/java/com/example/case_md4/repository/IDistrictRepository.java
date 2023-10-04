package com.example.case_md4.repository;

import com.example.case_md4.model.City;
import com.example.case_md4.model.District;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IDistrictRepository extends JpaRepository<District, Long> {
    List<District> findAllByCity(City city);
}
