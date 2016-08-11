package com.junyi.erp.enums;

public enum PurchasePaymentStatus {

	DRAFT("草稿"),
	COMPLETED("已完成"),
	CANCELLED("已取消");

	private String description;

	PurchasePaymentStatus(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

}
