package com.junyi.erp.enums;

public enum OrderReviewType {

	REVIEW_ALL("全部客审"),
	REVIEW_ON_DEMAND("按需客审"),
	REVIEW_NONE("全部不客审");

	private String description;

	OrderReviewType(String description) {
		this.description = description;
	}

	public String getDescription() {
		return this.description;
	}

}
