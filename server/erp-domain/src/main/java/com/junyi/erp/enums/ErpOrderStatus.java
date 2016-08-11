package com.junyi.erp.enums;

/**
 * 订单状态
 */
public enum ErpOrderStatus {
	PENDING_AUDIT("待审核"),
	AUDIT_DONE("已审核"),
	ALLOCATING("配货中"),
	PENDING_RECV("待收货"),
	FINISHED("已完成"),
	CLOSED("已关闭"),
	CANCELLED("已取消"),
	DELETED("已删除");

	private String name;
	ErpOrderStatus(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}
}
