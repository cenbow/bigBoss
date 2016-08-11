package com.junyi.erp.service.user;

import java.util.List;
import java.util.Map;

import com.junyi.ecommerce.core.mybatis.page.Page;
import com.junyi.ecommerce.core.mybatis.page.PageRequest;
import com.junyi.erp.domain.user.User;
import com.junyi.erp.domain.user.UserRememberMeLogin;

public interface UserService {

	void insert(User user);

	void insertSelective(User user);

	void update(User user);

	void updateNullable(User user);
	
	void updateCompanyRelated(User user);

	User selectByPk(Integer pk);

	void deleteByPk(Integer pk);


}
