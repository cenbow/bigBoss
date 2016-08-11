package com.junyi.erp.enums;

/**
 * 订单发货类型，影响订单发货流程
 * 可选项包括：验货后发货、称重后发货、手工发货；
 * a) 验货后发货：即订单扫描验货后自动发货，无需进行订单称重和扫描发货环节；
 * b) 称重后发货：即订单称重后自动发货，无需进行扫描发货环节；
 * c) 手工发货：即订单需要扫描发货环节
 * 
 * @author LxC
 */
public enum OrderDeliverType {

	AFTER_EXAMINE("验货后发货"),
	AFETR_WEIGH("称重后发货"),
	MANUALLY("手工发货");

	private String description;

	OrderDeliverType(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

}
