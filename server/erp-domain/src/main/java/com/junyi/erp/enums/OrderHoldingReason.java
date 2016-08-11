package com.junyi.erp.enums;

public enum OrderHoldingReason {

	NOT_HOLDING("未拦截"),
	ERR_LOGISTICS("没有匹配物流"),
	ERR_GOODS_UNAVAIL("商品不存在"),
	ERR_WHS_PICK_AREA("未指定拣货区"),
	ERR_OVERSELL("超卖异常"),
	ERR_CONSIGN_WB("发货回写异常"),
	ERR_CLOSED("平台订单取消"),
	ERR_AFTERSALE("售后拦截"),
	ERR_MANUAL("手工拦截");  // 页面上手工发起拦截，拦截备注可以自由配置

	private String description;

	OrderHoldingReason(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

}
