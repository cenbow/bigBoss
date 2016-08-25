package com.junyi.erp.service.user;

import com.junyi.ecommerce.core.mybatis.page.Page;
import com.junyi.ecommerce.core.mybatis.page.PageRequest;
import com.junyi.erp.domain.Information;

public interface InformationService {

	void insert(Information information);

	void update(Information information);

	Information selectInformationByPK(Integer pk);

	Page<Information> selectInformationByFiltersPage(PageRequest request);

	void insertUrl(Information information);

	void deleteUrl(Integer id);
}
