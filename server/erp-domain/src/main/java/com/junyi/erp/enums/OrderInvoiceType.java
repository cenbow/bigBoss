package com.junyi.erp.enums;

public enum OrderInvoiceType {

	NA("无需发票"),
	REGULAR("普通发票"),
	VAT("增值税普通发票"),
	VAT_SPECIAL("增值税专用发票"),
	RECEIPT_NOTE("收据");
	
	private String description;

	OrderInvoiceType(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

}
