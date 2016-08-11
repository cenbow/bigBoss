package com.junyi.erp.enums;

public enum OrderType {

	GENERAL("一般订单"),
	COD("货到付款"),
	/** 跟一般订单类似，但打印物流单不一样 */
	WDS("一件代发"),
	PRESALE("预售订单"),
	/** 虚拟订单不需要发货 */
	VIRTUAL("虚拟订单");

	private String description;

	OrderType(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

}
