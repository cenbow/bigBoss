package com.junyi.erp.enums;

public enum PurchaseReturnType {

	RETURN_REFUND("退款"),
	RETURN_EXCHANGE("换货"),
	NORMAL_LOSS("正常损耗");

	private String description;

	PurchaseReturnType(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

}
