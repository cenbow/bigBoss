package com.junyi.erp.enums;

/**
 * 下单距今
 */
public enum OrderTimeSpan {

	WITHIN_1_DAY("24小时以内"),
	WITHIN_2_DAYS("48小时以内"),
	WITHIN_3_DAYS("72小时以内"),
	BETWEEN_3_TO_7_DAYS("3~7天以内"),
	WITHIN_30_DAYS("30天以内"),
	WITHIN_90_DAYS("90天以内");

	private String description;

	OrderTimeSpan(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

}
