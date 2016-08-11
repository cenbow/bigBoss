package com.junyi.erp.enums;

public enum OrderPrintTag {

	/** 快递单打印标签 */
	PRINT_WAYBILL("快", 0x0001, "#1ea0fc"),
	/** 电子面单打印标签 */
	PRINT_E_WAYBILL("电", 0x0002, "#6142ff"),
	/** 拣货单打印标签 */
	PRINT_PICKING("拣", 0x0004, "#f95738"),
	/** 发货单打印标签 */
	PRINT_SHIPPING("发", 0x0008, "#f83399");

	private String label;
	private int mask;
	private String color;

	OrderPrintTag(String label, int mask, String color) {
		this.label = label;
		this.mask = mask;
		this.color = color;
	}

	public String getLabel() {
		return label;
	}

	public int getMask() {
		return mask;
	}

	public String getColor() {
		return color;
	}
	
}
