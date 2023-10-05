package com.example.case_md4.controller;

import com.example.case_md4.model.City;
import com.example.case_md4.model.District;
import com.example.case_md4.model.Ward;
import com.example.case_md4.service.iplm.AddressServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/address")
public class AddressController {
    @Autowired
    private AddressServiceImpl addressService;

    @GetMapping("/city")
    public ResponseEntity<List<City>> findAllCity(){
        return ResponseEntity.ok(addressService.findAllCity());
    }
    @GetMapping("/city/{id}")
    public ResponseEntity<City> findCityById(@PathVariable("id") Long id_city){
        return ResponseEntity.ok(addressService.findCityById(id_city));
    }
    @GetMapping("/district{id_city}")
    public ResponseEntity<List<District>> findAllDistrictByCity(@PathVariable("id_city") Long id_city){
        return ResponseEntity.ok(addressService.findAllDistrictByCity(id_city));
    }
    @GetMapping("/district/{id}")
    public ResponseEntity<District> findDistrictById(@PathVariable("id") Long id_district){
        return ResponseEntity.ok(addressService.findDistrictById(id_district));
    }

    @GetMapping("/ward{id_district}")
    public ResponseEntity<List<Ward>> findAllWardByDistrict(@PathVariable("id_district") Long id_district){
        return ResponseEntity.ok(addressService.findAlWardByDistrict(id_district));
    }
    @GetMapping("/ward/{id}")
    public ResponseEntity<Ward> findWardById(@PathVariable("id") Long id_ward){
        return ResponseEntity.ok(addressService.findWardById(id_ward));
    }

}
