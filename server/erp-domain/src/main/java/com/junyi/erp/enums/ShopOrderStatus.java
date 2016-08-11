package com.junyi.erp.enums;

public enum ShopOrderStatus {

	PENDING_CONSIGN("未发货"),
	CONSIGNED("已发货"),
	/**
	 * 如果系统订单处于已发货状态，会变成已完结
	 */
	COMPLETED("已完成"),
	/**
	 * 付款后用户退款成功，订单关闭；或者货到付款订单用户直接取消。
	 * NOTE：如果这个过程中，系统订单未发货，会发起拦截
	 */
	CLOSED("已关闭");

	private String description;

	ShopOrderStatus(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

}
