package com.junyi.erp.enums;

public enum CustomsModel {

	BONDED_STOCK("保税备货"),
	BONDED_COLLECT("保税集货"),
	OVERSEE_POSTAL("海外直邮");  // 通过邮关发货

	private String description;

	CustomsModel(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

}
