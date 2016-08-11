package com.junyi.erp.enums;

public enum ShopChannel {

	OFFLINE("线下"),
	PROPRIETORY("自营商城");

	private String description;

	ShopChannel(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

}
