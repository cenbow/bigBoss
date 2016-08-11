package com.junyi.erp.enums;

public enum StockRecordStatus {

	DRAFT("草稿"),
	TRANSFERRED_IN("已入库"),
	TRANSFERRED_OUT("已出库"),
	CANCELLED("已取消");

	private String description;

	StockRecordStatus(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

}
