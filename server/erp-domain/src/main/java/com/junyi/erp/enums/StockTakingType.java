package com.junyi.erp.enums;

public enum StockTakingType {

	PARTIAL("部分盘点"),
	ENTIRE("全部盘点");

	private String description;

	StockTakingType(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

}
