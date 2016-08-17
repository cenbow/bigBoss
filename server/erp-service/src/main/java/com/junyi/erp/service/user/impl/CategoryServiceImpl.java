package com.junyi.erp.service.user.impl;

import com.junyi.ecommerce.core.mybatis.dao.MyBatisDAO;
import com.junyi.ecommerce.core.mybatis.page.Page;
import com.junyi.ecommerce.core.mybatis.page.PageRequest;
import com.junyi.erp.domain.Account;
import com.junyi.erp.domain.Category;
import com.junyi.erp.domain.Column;
import com.junyi.erp.service.user.AccountService;
import com.junyi.erp.service.user.CategoryService;
import com.junyi.erp.service.user.ColumnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("categoryService")
@Transactional
public class CategoryServiceImpl implements CategoryService {

	@Autowired
 	private MyBatisDAO myBatisDAO;

	@Override
	public void insert(Category category) {
		myBatisDAO.insert("insertCategory", category);
	}

	@Override
	public void update(Category category) {
		myBatisDAO.update("updateCategory", category);
	}

	@Override
	public Category selectByPk(Integer pk) {
		return myBatisDAO.findForObject("selectCategoryByPK", pk);
	}

	@Override
	public void deleteByPk(Integer pk) {
		myBatisDAO.delete("deleteCategoryByPK", pk);
	}

	@Override
	public List<Category> listCategoryByColumnCode(Integer columnId) {
		return myBatisDAO.findForList("selectCategoryByColumnId",columnId);
	}

	@Override
	public int selectIsExistName(String name, int columnId) {
		Map map = new HashMap();
		map.put("name",name);
		map.put("columnId",columnId);
		return myBatisDAO.findForObject("selectIsExistName",map);
	}

	@Override
	public Page<Category> selectCategoryByFiltersPage(PageRequest request) {
		return myBatisDAO.findForPage("selectCategoryByFiltersPage",request);
	}
}
