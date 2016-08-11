package com.junyi.erp.domain.user;

import java.io.Serializable;
import java.util.Date;

public class UserRememberMeLogin implements Serializable {

	private static final long serialVersionUID = 1L;

	/**
	 * 用户ID
	 */
	private Integer userId;

	/**
	 * 免登陆令牌
	 */
	private String rememberMeToken;

	/**
	 * 免登陆令牌过期时间
	 */
	private Date rememberMeExpireDate;

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getRememberMeToken() {
		return rememberMeToken;
	}

	public void setRememberMeToken(String rememberMeToken) {
		this.rememberMeToken = rememberMeToken;
	}

	public Date getRememberMeExpireDate() {
		return rememberMeExpireDate;
	}

	public void setRememberMeExpireDate(Date rememberMeExpireDate) {
		this.rememberMeExpireDate = rememberMeExpireDate;
	}

}
