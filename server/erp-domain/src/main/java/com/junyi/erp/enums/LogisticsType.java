package com.junyi.erp.enums;

/**
 * 物流类型(平邮/快递公司/EMS)
 */
public enum LogisticsType {

	POSTAL("平邮"),
	EXPRESS("快递"),
	EMS("EMS");

	private String description;

	LogisticsType(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

}
