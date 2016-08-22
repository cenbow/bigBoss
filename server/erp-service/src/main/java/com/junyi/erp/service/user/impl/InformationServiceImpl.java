package com.junyi.erp.service.user.impl;

import com.junyi.ecommerce.core.mybatis.dao.MyBatisDAO;
import com.junyi.ecommerce.core.mybatis.page.Page;
import com.junyi.ecommerce.core.mybatis.page.PageRequest;
import com.junyi.erp.domain.Category;
import com.junyi.erp.domain.Information;
import com.junyi.erp.service.user.CategoryService;
import com.junyi.erp.service.user.InformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("informationService")
@Transactional
public class InformationServiceImpl implements InformationService {

	@Autowired
 	private MyBatisDAO myBatisDAO;

	@Override
	public void insert(Information information) {
		myBatisDAO.insert("insertInformation", information);
	}

	@Override
	public void update(Information information) {
		myBatisDAO.update("updateInformation", information);
	}

	@Override
	public Page<Information> selectInformationByFiltersPage(PageRequest request) {
		return myBatisDAO.findForPage("selectInformationByFiltersPage",request);
	}
}
