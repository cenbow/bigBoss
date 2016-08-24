package com.junyi.erp.vo;

import com.junyi.ecommerce.core.util.vo.BaseVO;
import com.junyi.erp.domain.user.User;

public class ComboboxStringVO implements BaseVO {
	
	/**
	 * key
	 */
	private String key;

	/**
	 * @param value
	 */
	private String value;

	public String getKey() {
		return key;
	}

	public void setKey(String index) {
		this.key = index;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	@Override
	public void convertPOToVO(Object poObj) {

	}
	
	public User convertVOToPO(ComboboxStringVO vo){

		return null;
	}

}
