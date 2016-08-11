package com.junyi.erp.enums;

public enum StockTakingStatus {

	DRAFT("草稿"),
	PENDING_APPROVE("待审核"),
	APPROVED("审核通过"),
	CANCELLED("已取消");

	private String description;

	StockTakingStatus(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

}
