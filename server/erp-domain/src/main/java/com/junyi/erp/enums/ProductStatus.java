package com.junyi.erp.enums;

/**
 * SPU-oriented
 * 停用商品
 * SPU -> RECYCLED    SKU -> RECYCLED_AFTER_SPU
 * 
 * SKU-oriented
 * 停用商品规格
 * SPU -> 不影响             SKU -> RECYCLED
 * 
 * @author LxC
 */
public enum ProductStatus {

    ON_SALE("销售中"),
    OFF_SHELVES("已下架"),
	RECYCLED("已停用"),  // 允许恢复
    RECYCLED_AFTER_SPU("已停用(跟随SPU)"),  // 允许恢复(跟随SPU)
    DELETED("已删除");  // 已删除，无法恢复，并且从ES中删除 (SPU-oriented下删除规格)

	private String description;

	ProductStatus(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

}
