package com.junyi.erp.enums;

public enum ShopOrderConvertStatus {

	PENDING("未转"),
	CONVERTED("已转");

	private String description;

	ShopOrderConvertStatus(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

}
