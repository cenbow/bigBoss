package com.junyi.erp.service.user;

import com.junyi.ecommerce.core.mybatis.page.Page;
import com.junyi.ecommerce.core.mybatis.page.PageRequest;
import com.junyi.erp.domain.Account;

public interface AccountService {

	void insert(Account account);

	void update(Account account);

	Account selectByPk(Integer pk);

	void deleteByPk(Integer pk);

	Page<Account> selectAccountByFiltersPage(PageRequest pageRequest);

}
