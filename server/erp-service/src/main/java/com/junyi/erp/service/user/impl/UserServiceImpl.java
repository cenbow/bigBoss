package com.junyi.erp.service.user.impl;

import com.junyi.ecommerce.core.mybatis.dao.MyBatisDAO;
import com.junyi.erp.domain.user.User;
import com.junyi.erp.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("userService")
@Transactional
public class UserServiceImpl implements UserService {


	@Autowired
 	private MyBatisDAO myBatisDAO;

	@Override
	public void insert(User user) {
		myBatisDAO.insert("insertUser", user);
	}

	@Override
	public void insertSelective(User user) {
		myBatisDAO.insert("insertUserSelective", user);
	}

	@Override
	public void update(User user) {
		myBatisDAO.update("updateUser", user);
	}

	@Override
	public void updateNullable(User user) {
		myBatisDAO.update("updateUserNullable", user);
	}
	
	@Override
	public void updateCompanyRelated(User user) {
		myBatisDAO.update("updateCompanyRelatedByUser", user);
	}

	@Override
	@Transactional(readOnly = true)
	public User selectByPk(Integer pk) {
		return myBatisDAO.findForObject("selectUserByPk", pk);
	}

	@Override
	public void deleteByPk(Integer pk) {
		myBatisDAO.delete("deleteUserByPk", pk);
	}


}
