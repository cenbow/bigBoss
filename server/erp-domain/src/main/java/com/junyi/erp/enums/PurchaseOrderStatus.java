package com.junyi.erp.enums;

public enum PurchaseOrderStatus {

	DRAFT("草稿"),
	PENDING_RECEIVE("待收货"),
	PARTIALLY_RECEIVED("部分收货"),  // 由明细反馈回来
	FULLY_RECEIVED("完成收货"),  // 由明细反馈回来
	COMPLETED("已完成"),  // 需要手动确认，主要是作为财务上的已完结
	CANCELLED("已取消");

	private String description;

	PurchaseOrderStatus(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

}
