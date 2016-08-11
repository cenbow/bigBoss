package com.junyi.erp.enums;

public enum PurchaseOrderLineStatus {

	DRAFT("草稿"),  // 跟随订单状态
	PENDING_RECEIVE("待收货"),  // 跟随订单状态
	PARTIALLY_RECEIVED("部分收货"),  // 反馈到订单状态
	FULLY_RECEIVED("完成收货"),  // 反馈到订单状态
	COMPLETED("已完成"),  // 跟随订单状态
	CANCELLED("已取消");  // 跟随订单状态

	private String description;

	PurchaseOrderLineStatus(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

}
