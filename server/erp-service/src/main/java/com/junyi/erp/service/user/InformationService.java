package com.junyi.erp.service.user;

import com.junyi.ecommerce.core.mybatis.page.Page;
import com.junyi.ecommerce.core.mybatis.page.PageRequest;
import com.junyi.erp.domain.Information;

public interface InformationService {

	void insert(Information information);

	void update(Information information);

	Page<Information> selectInformationByFiltersPage(PageRequest request);
}
