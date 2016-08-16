package com.junyi.erp.service.user;

import com.junyi.ecommerce.core.mybatis.page.Page;
import com.junyi.ecommerce.core.mybatis.page.PageRequest;
import com.junyi.erp.domain.Account;
import com.junyi.erp.domain.Company;

import java.util.List;

public interface CompanyService {

	void insert(Company company);

	void update(Company company);

	Company selectByPk(Integer pk);

	void deleteByPk(Integer pk);

	List<Company> listAll();

	Page<Company> selectCompanyByFiltersPage(PageRequest pageRequest);

}
