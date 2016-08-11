package com.junyi.erp.enums;

public enum ActiveFlag {

	I,  // Inactive
	A,  // Active
	D;  // Deleted

	public boolean isActive() {
		return this == A;
	}

	public boolean isInactive() {
		return this == I;
	}

	public boolean isDeleted() {
		return this == D;
	}

}
