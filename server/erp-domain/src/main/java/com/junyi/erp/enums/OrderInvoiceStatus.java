package com.junyi.erp.enums;

public enum OrderInvoiceStatus {

	SENT("已开票"),
	NOT_SENT("未开票");

	private String description;

	OrderInvoiceStatus(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

}
