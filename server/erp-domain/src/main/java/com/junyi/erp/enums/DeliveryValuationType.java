package com.junyi.erp.enums;

/**
 * 物流计费标准(按件/按重量/按体积)
 */
public enum DeliveryValuationType {

	// LxC(2016-06-23): 按件方式暂时不考虑
	//BY_QUANTITY("按件"),
	BY_WEIGHT("按重量"),
	BY_SIZE("按体积");

	private String description;

	DeliveryValuationType(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

}
