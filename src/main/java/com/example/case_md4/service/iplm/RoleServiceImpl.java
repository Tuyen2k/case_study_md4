package com.example.case_md4.service.iplm;

import com.example.case_md4.model.Role;
import com.example.case_md4.repository.IRoleRepository;
import com.example.case_md4.service.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements IRoleService {
    @Autowired
    private IRoleRepository iRoleRepository;

    @Override
    public Role findById(Long id) {
        return iRoleRepository.findById(id).orElse(null);
    }

    @Override
    public List<Role> findAll() {
        return iRoleRepository.findAll();
    }

    @Override
    public void save(Role role) {
        iRoleRepository.save(role);
    }
}
