package com.junyi.erp.enums;

public enum YesNoFlag {

	Y, N;
	
	public boolean toBoolean() {
		return this == Y;
	}

}
