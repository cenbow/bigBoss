package com.junyi.erp.enums;

public enum OrderFinancialReviewType {
	REVIEW_NONE("全部不财审"), 
	REVIEW_PER_ORDER_PROFIT("按订单利润财审");

	private String description;

	OrderFinancialReviewType(String description) {
		this.description = description;
	}

	public String getDescription() {
		return this.description;
	}

}
