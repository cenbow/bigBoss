package com.junyi.erp.service.user;

import com.junyi.erp.domain.Account;
import com.junyi.erp.domain.Column;

import java.util.List;

public interface ColumnService {

	void insert(Column column);

	void update(Column Column);

	Column selectByPk(Integer pk);

	void deleteByPk(Integer pk);

	Column selectByCode(String code);

	List<Column> listAll();


}
