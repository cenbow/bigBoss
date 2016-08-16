package com.junyi.erp.service.user;

import com.junyi.erp.domain.Account;
import com.junyi.erp.domain.Role;

public interface RoleService {

	void insert(Role role);

	void update(Role role);

	Role selectByPk(Integer pk);

	void deleteByPk(Integer pk);

}
