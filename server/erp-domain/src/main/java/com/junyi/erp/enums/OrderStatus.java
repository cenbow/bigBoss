package com.junyi.erp.enums;

public enum OrderStatus {

	PENDING_REVIEW("待客审"),
	PENDING_FIN_REVIEW("待财审"),
	REVIEW_PASS("已审核"),
	PICKING("配货中"),
	PICKING_CHECKED("已验货"),
	PICKING_WEIGHED("已称重"),
	CONSIGNED("已发货"),
	COMPLETED("已完成"),
	CANCELLED("已取消"),
	DELETED("已删除"),  // 查询不可见
	DELETED_COMBINED("合并后删除"),  // 可通过订单恢复还原
	DELETED_DIVIDED("拆分后删除");  // 可通过订单恢复还原

	private String description;

	OrderStatus(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

}
