package com.junyi.erp.enums;

public enum AreaLevel {
	COUNTRY(1),
	PROVINCE(2),
	CITY(3),
	COUNTY(4),
	ALL(Integer.MAX_VALUE);


	private int level;
	AreaLevel(int level) {
		this.level = level;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}
}
