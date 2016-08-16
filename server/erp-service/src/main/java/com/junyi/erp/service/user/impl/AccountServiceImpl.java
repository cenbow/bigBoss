package com.junyi.erp.service.user.impl;

import com.junyi.ecommerce.core.mybatis.dao.MyBatisDAO;
import com.junyi.ecommerce.core.mybatis.page.Page;
import com.junyi.ecommerce.core.mybatis.page.PageRequest;
import com.junyi.erp.domain.Account;
import com.junyi.erp.service.user.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("accountService")
@Transactional
public class AccountServiceImpl implements AccountService {


	@Autowired
 	private MyBatisDAO myBatisDAO;


	@Override
	public void insert(Account account) {
		myBatisDAO.insert("insertAccount", account);
	}

	@Override
	@Transactional
	public void update(Account account) {
		myBatisDAO.update("updateAccount", account);
	}

	@Override
	public Account selectByPk(Integer pk) {
		return myBatisDAO.findForObject("selectAccountByPK", pk);
	}

	@Override
	public void deleteByPk(Integer pk) {
		myBatisDAO.delete("deleteAccountByPK", pk);
	}

	@Override
	public Page<Account> selectAccountByFiltersPage(PageRequest pageRequest) {
		return myBatisDAO.findForPage("selectAccountByFiltersPage", pageRequest);
	}
}