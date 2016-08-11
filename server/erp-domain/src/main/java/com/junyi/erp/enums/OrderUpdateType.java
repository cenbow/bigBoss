package com.junyi.erp.enums;

public enum OrderUpdateType {

	INIT("制单"),
	COMBINED("合单"),
	COMBINED_DELETE("合单删除"),  // 删除合单的原始单
	COMBINED_ROLLBACK("合单恢复"),  // 恢复合单的原始单
	DIVIDED("拆单"),
	DIVIDED_DELETE("拆单删除"),  // 删除拆单的原始单
	DIVIDED_ROLLBACK("拆单恢复"),  // 恢复拆单的原始单
	ORDER_REVIEW("客审"),
	ORDER_REVIEW_PASS("客审通过"),
	ORDER_FIN_REVIEW("财审"),  // 财审通过
	BACK_TO_REVIEW("打回待审"),
	PICK_START("开始拣货"),
	PICK_CHECK("验货"),
	PICK_WEIGH("称重"),
	PICK_SHIP("发货"),
	PRINT_WAYBILL("打印物流单"),
	PRINT_E_WAYBILL("打印电子面单"),
	PRINT_PICKING("打印拣货单"),
	PRINT_SHIPPING("打印发货单"),
	ORDER_COMPLETED("订单完成"),
	ORDER_CANCELLED("订单取消"),
	HOLDING("拦截"),
	HOLDING_ROLLBACK("解除拦截"),
	UPDATE("订单更新");  // 尽量不要用这个

	private String description;

	OrderUpdateType(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

}
