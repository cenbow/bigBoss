package com.junyi.erp.enums;

public enum SexType {

	MALE("男"),
	FEMALE("女"),
	NOT_SET("保密");

	private String description;

	SexType(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

	public boolean isMale() {
		return this == MALE;
	}

	public boolean isFemale() {
		return this == FEMALE;
	}

	public boolean isNotSet() {
		return this == NOT_SET;
	}

}
