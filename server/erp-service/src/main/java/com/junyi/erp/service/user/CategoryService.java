package com.junyi.erp.service.user;

import com.junyi.ecommerce.core.mybatis.page.Page;
import com.junyi.ecommerce.core.mybatis.page.PageRequest;
import com.junyi.erp.domain.Account;
import com.junyi.erp.domain.Category;

import java.util.List;
import java.util.Map;

public interface CategoryService {

	void insert(Category category);

	void update(Category category);

	Category selectByPk(Integer pk);

	void deleteByPk(Integer pk);

	List<Category> listAll();

	List<Category> listCategoryByColumnCode(Map params);

	List<Category> listCategoryByUpClassId(Integer id);

	Category selectIsExistName(String name, int columnId, int upClassId);

	Page<Category> selectCategoryByFiltersPage(PageRequest request);

}
