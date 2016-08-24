package com.junyi.erp.service.user;

import com.junyi.ecommerce.core.mybatis.page.Page;
import com.junyi.ecommerce.core.mybatis.page.PageRequest;
import com.junyi.erp.domain.Information;

import java.util.List;
import java.util.Map;

public interface InformationService {

	void insert(Information information);

	void update(Information information);

	Information selectInformationByPK(Integer pk);

	Page<Information> selectInformationByFiltersPage(PageRequest request);

	void insertUrl(Information information);

	void deleteUrl(Integer id);

	List<Information> selectByParam(Map param);
}
