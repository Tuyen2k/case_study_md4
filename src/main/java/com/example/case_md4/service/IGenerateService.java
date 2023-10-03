package com.example.case_md4.service;

import java.util.List;

public interface IGenerateService<E> {
    List<E> findAll();
    E findById(Long id);
    void save(E e);
}
