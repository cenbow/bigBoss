package com.junyi.erp.service.user.impl;

import com.junyi.ecommerce.core.mybatis.dao.MyBatisDAO;
import com.junyi.erp.domain.Account;
import com.junyi.erp.domain.Column;
import com.junyi.erp.service.user.AccountService;
import com.junyi.erp.service.user.ColumnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("columnService")
@Transactional
public class ColumnServiceImpl implements ColumnService {

	@Autowired
 	private MyBatisDAO myBatisDAO;


	@Override
	public void insert(Column column) {
		myBatisDAO.insert("insertColumn", column);
	}

	@Override
	public void update(Column column) {
		myBatisDAO.update("updateColumn", column);
	}

	@Override
	public Column selectByPk(Integer pk) {
		return myBatisDAO.findForObject("selectColumnByPK", pk);
	}

	@Override
	public void deleteByPk(Integer pk) {
		myBatisDAO.delete("deleteColumnByPK", pk);
	}

	@Override
	public Column selectByCode(String code) {
		return myBatisDAO.findForObject("selectColumnByCode", code);
	}

	@Override
	public List<Column> listAll() {
		return myBatisDAO.findForList("listAllColumns");
	}

}
