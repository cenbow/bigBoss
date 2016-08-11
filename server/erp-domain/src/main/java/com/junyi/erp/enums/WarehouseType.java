package com.junyi.erp.enums;

public enum WarehouseType {

	DOMESTIC("国内自营仓"),
	VIRTUAL_DIST("虚拟分销仓"),
	// 暂时不考虑海外仓  TODO
	//OVERSEA("海外仓"),
	BONDED_AREA("保税仓"),
	OFFLINE_STORE("线下店铺仓");

	private String description;

	WarehouseType(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

}
