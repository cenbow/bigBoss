package com.junyi.erp.domain.user;

import java.io.Serializable;
import java.util.Date;
import com.junyi.erp.enums.YesNoFlag;

public class User implements Serializable {

	private static final long serialVersionUID = 1L;

	/**
	 * 主键
	 */
	private Integer id;

	/**
	 * 公司ID
	 */
	private Integer companyId;

	/**
	 * 手机号
	 */
	private String mobile;

	/**
	 * 用户名(用于显示)
	 */
	private String name;

	/**
	 * 登录名称
	 */
	private String login;

	/**
	 * 登录名称小写
	 */
	private String lowerLogin;

	/**
	 * 邮箱名
	 */
	private String email;

	/**
	 * 邮箱名小写
	 */
	private String lowerEmail;

	/**
	 * 密码散列
	 */
	private String password;

	/**
	 * 备注
	 */
	private String memo;

	/**
	 * 邮箱验证
	 */
	private YesNoFlag emailVerified;

	/**
	 * 手机验证
	 */
	private YesNoFlag mobileVerified;

	/**
	 * 最近登录时间
	 */
	private Date lastLoginDate;

	/**
	 * 是否锁定
	 */
	private YesNoFlag locked;

	/**
	 * 最后锁定时间
	 */
	private Date lastLockDate;

	/**
	 * 分部ID
	 */
	private Integer branchId;

	/**
	 * 部门ID
	 */
	private Integer deptId;

	/**
	 * 职位ID
	 */
	private Integer positionId;

	/**
	 * 是否管理员(根据所属公司授权的模块获取所有权限)
	 */
	private YesNoFlag isAdmin;

	/**
	 * 是否删除
	 */
	private YesNoFlag isDeleted;

	/**
	 * 创建人
	 */
	private Integer createBy;

	/**
	 * 创建日期
	 */
	private Date createDate;

	/**
	 * 更新人
	 */
	private Integer updateBy;

	/**
	 * 最近更新时间
	 */
	private Date updateDate;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Integer companyId) {
		this.companyId = companyId;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getLowerLogin() {
		return lowerLogin;
	}

	public void setLowerLogin(String lowerLogin) {
		this.lowerLogin = lowerLogin;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getLowerEmail() {
		return lowerEmail;
	}

	public void setLowerEmail(String lowerEmail) {
		this.lowerEmail = lowerEmail;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public YesNoFlag getEmailVerified() {
		return emailVerified;
	}

	public void setEmailVerified(YesNoFlag emailVerified) {
		this.emailVerified = emailVerified;
	}

	public YesNoFlag getMobileVerified() {
		return mobileVerified;
	}

	public void setMobileVerified(YesNoFlag mobileVerified) {
		this.mobileVerified = mobileVerified;
	}

	public Date getLastLoginDate() {
		return lastLoginDate;
	}

	public void setLastLoginDate(Date lastLoginDate) {
		this.lastLoginDate = lastLoginDate;
	}

	public YesNoFlag getLocked() {
		return locked;
	}

	public void setLocked(YesNoFlag locked) {
		this.locked = locked;
	}

	public Date getLastLockDate() {
		return lastLockDate;
	}

	public void setLastLockDate(Date lastLockDate) {
		this.lastLockDate = lastLockDate;
	}

	public Integer getBranchId() {
		return branchId;
	}

	public void setBranchId(Integer branchId) {
		this.branchId = branchId;
	}

	public Integer getDeptId() {
		return deptId;
	}

	public void setDeptId(Integer deptId) {
		this.deptId = deptId;
	}

	public Integer getPositionId() {
		return positionId;
	}

	public void setPositionId(Integer positionId) {
		this.positionId = positionId;
	}

	public YesNoFlag getIsAdmin() {
		return isAdmin;
	}

	public void setIsAdmin(YesNoFlag isAdmin) {
		this.isAdmin = isAdmin;
	}

	public YesNoFlag getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(YesNoFlag isDeleted) {
		this.isDeleted = isDeleted;
	}

	public Integer getCreateBy() {
		return createBy;
	}

	public void setCreateBy(Integer createBy) {
		this.createBy = createBy;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Integer getUpdateBy() {
		return updateBy;
	}

	public void setUpdateBy(Integer updateBy) {
		this.updateBy = updateBy;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

}
