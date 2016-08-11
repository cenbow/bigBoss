package com.junyi.erp.enums;

public enum OrderPaymentStatus {

	PAID("已支付"),
	NOT_PAID("未支付");

	private String description;

	OrderPaymentStatus(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

}
