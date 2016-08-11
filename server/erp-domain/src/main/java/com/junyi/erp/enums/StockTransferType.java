package com.junyi.erp.enums;

public enum StockTransferType {

	WITHIN_WHS("仓内转储"),
	BETWEEN_WHS("多仓转储");

	private String description;

	StockTransferType(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

}
