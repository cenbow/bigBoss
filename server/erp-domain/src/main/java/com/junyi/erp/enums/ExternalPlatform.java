package com.junyi.erp.enums;

public enum ExternalPlatform {

	HIGOUMALL("易宝分销平台", true),

	TAOBAO("淘宝", false),
	TMALL("天猫", false),
	JD("京东", false);

	// 所属平台
	String platformName;
	
	// 是否分销平台
	boolean isDistPlatform;

	private ExternalPlatform(String platform, boolean isDistPlatform) {
		this.platformName = platform;
		this.isDistPlatform = isDistPlatform;
	}

	public String getPlatformName() {
		return platformName;
	}

	public boolean isDistPlatform() {
		return isDistPlatform;
	}

	public static ExternalPlatform[] getDistPlatforms() {
		return distPlatforms;
	}

	private static final ExternalPlatform[] distPlatforms =
			new ExternalPlatform[] { HIGOUMALL };

}
