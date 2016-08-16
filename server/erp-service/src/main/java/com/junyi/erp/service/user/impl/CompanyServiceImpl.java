package com.junyi.erp.service.user.impl;

import com.junyi.ecommerce.core.mybatis.dao.MyBatisDAO;
import com.junyi.ecommerce.core.mybatis.page.Page;
import com.junyi.ecommerce.core.mybatis.page.PageRequest;
import com.junyi.erp.domain.Account;
import com.junyi.erp.domain.Company;
import com.junyi.erp.service.user.AccountService;
import com.junyi.erp.service.user.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("companyService")
@Transactional
public class CompanyServiceImpl implements CompanyService {

	@Autowired
 	private MyBatisDAO myBatisDAO;


	@Override
	public void insert(Company company) {
		myBatisDAO.insert("insertCompany", company);
	}

	@Override
	public void update(Company company) {
		myBatisDAO.update("updateCompany", company);
	}

	@Override
	public Company selectByPk(Integer pk) {
		return myBatisDAO.findForObject("selectCompanyByPK", pk);
	}

	@Override
	public void deleteByPk(Integer pk) {
		myBatisDAO.delete("deleteCompanyByPK", pk);
	}

	@Override
	public List<Company> listAll() {
		return myBatisDAO.findForList("listAllCompany");
	}

	@Override
	public Page<Company> selectCompanyByFiltersPage(PageRequest pageRequest) {
		return myBatisDAO.findForPage("selectCompanyByFiltersPage", pageRequest);
	}
}
