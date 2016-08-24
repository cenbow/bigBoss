package com.junyi.erp.service.user;

import com.junyi.ecommerce.core.mybatis.page.Page;
import com.junyi.ecommerce.core.mybatis.page.PageRequest;
import com.junyi.erp.domain.Account;
import com.junyi.erp.domain.Category;

import java.util.List;

public interface CategoryService {

	void insert(Category category);

	void update(Category category);

	Category selectByPk(Integer pk);

	void deleteByPk(Integer pk);

	List<Category> listCategoryByColumnCode(Integer columnId);

	List<Category> listCategoryByUpClassId(Integer id);

	int selectIsExistName(String name, int columnId);

	Page<Category> selectCategoryByFiltersPage(PageRequest request);

}
