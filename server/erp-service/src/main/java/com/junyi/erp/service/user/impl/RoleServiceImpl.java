package com.junyi.erp.service.user.impl;

import com.junyi.ecommerce.core.mybatis.dao.MyBatisDAO;
import com.junyi.erp.domain.Account;
import com.junyi.erp.domain.Role;
import com.junyi.erp.service.user.AccountService;
import com.junyi.erp.service.user.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("roleService")
@Transactional
public class RoleServiceImpl implements RoleService {
	@Autowired
 	private MyBatisDAO myBatisDAO;


	@Override
	public void insert(Role role) {
		myBatisDAO.insert("insertRole", role);
	}

	@Override
	public void update(Role role) {
		myBatisDAO.update("updateRole", role);
	}

	@Override
	public Role selectByPk(Integer pk) {
		return myBatisDAO.findForObject("selectRoleByPK", pk);
	}

	@Override
	public void deleteByPk(Integer pk) {
		myBatisDAO.delete("deleteByPrimaryKey", pk);
	}
}
