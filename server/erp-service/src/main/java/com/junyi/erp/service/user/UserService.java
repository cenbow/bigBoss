package com.junyi.erp.service.user;

import com.junyi.erp.domain.user.User;

public interface UserService {

	void insert(User user);

	void insertSelective(User user);

	void update(User user);

	void updateNullable(User user);
	
	void updateCompanyRelated(User user);

	User selectByPk(Integer pk);

	void deleteByPk(Integer pk);


}
