package com.example.case_md4.service.iplm;

import com.example.case_md4.model.Address;
import com.example.case_md4.model.City;
import com.example.case_md4.model.District;
import com.example.case_md4.model.Ward;
import com.example.case_md4.repository.IAddressRepository;
import com.example.case_md4.repository.ICityRepository;
import com.example.case_md4.repository.IDistrictRepository;
import com.example.case_md4.repository.IWardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AddressServiceImpl {
    @Autowired
    private IAddressRepository iAddressRepository;
    @Autowired
    private ICityRepository iCityRepository;
    @Autowired
    private IDistrictRepository iDistrictRepository;
    @Autowired
    private IWardRepository iWardRepository;


    //address
    public Address findLast() {
        return iAddressRepository.findLast();
    }

    //city
    public List<City> findAllCity(){
        return iCityRepository.findAll();
    }
    public City findCityById(Long id_city) {
        Optional<City> city = iCityRepository.findById(id_city);
        if (city.isPresent()) {
            return city.get();
        }
        return null;
    }

    //district
    public District findDistrictById(Long id_district) {
        Optional<District> district = iDistrictRepository.findById(id_district);
        if (district.isPresent()) {
            return district.get();
        }
        return null;
    }

    public List<District> findAllDistrictByCity(Long id_city) {
        City city = findCityById(id_city);
        return iDistrictRepository.findAllByCity(city);
    }

    //ward
    public Ward findWardById(Long id_ward) {
        Optional<Ward> ward = iWardRepository.findById(id_ward);
        if (ward.isPresent()) {
            return ward.get();
        }
        return null;
    }
    public List<Ward> findAlWardByDistrict(Long id_district) {
        District district = findDistrictById(id_district);
        return iWardRepository.findAllByDistrict(district);
    }

    public void save(Address address){
        iAddressRepository.save(address);
    }

    public Address findAddressU(Long id_city,Long id_district,Long id_ward, String address_detail){
        return iAddressRepository.findAddressU(id_city, id_district, id_ward, address_detail);
    }
}
