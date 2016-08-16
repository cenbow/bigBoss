package com.junyi.erp.vo;

import com.junyi.ecommerce.core.util.vo.BaseVO;
import com.junyi.erp.domain.user.User;

public class ComboboxVO implements BaseVO {
	
	/**
	 * key
	 */
	private Integer key;

	/**
	 * @param value
	 */
	private String value;

	public Integer getKey() {
		return key;
	}

	public void setKey(Integer index) {
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
	
	public User convertVOToPO(ComboboxVO vo){

		return null;
	}

}
