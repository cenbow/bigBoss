package com.junyi.erp.enums;

public enum IdCardType {

	ID_CARD("身份证"),
	OFFICER("军官证"),
	PASSPORT("护照"),
	OTHER("其他");

	private String description;

	IdCardType(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

}
