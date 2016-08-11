package com.junyi.erp.enums;

public enum PurchasePaymentType {

	PAY("付款"),
	REFUND("收款");

	private String description;

	PurchasePaymentType(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

}
