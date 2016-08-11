package com.junyi.erp.vo;

import java.util.Date;

import javax.validation.constraints.NotNull;

import org.apache.commons.lang3.StringUtils;

import com.junyi.ecommerce.core.util.vo.BaseVO;
import com.junyi.erp.domain.user.User;
import com.junyi.erp.enums.YesNoFlag;

public class UserVO implements BaseVO {
	
	/**
	 * 主键
	 */
	private Integer id;

	/**
	 * 公司ID
	 */
	private Integer companyId;

	/**
	 * 公司名
	 */
	private String companyName;
	
	/**
	 * 手机号
	 */
	private String mobile;

	/**
	 * 用户名(用于显示)
	 */
	@NotNull(message="用户名称不能为空")
	private String name;

	/**
	 * 登录名称
	 */
	@NotNull(message="登录名称不能为空")
	private String login;

	/**
	 * 邮箱名
	 */
	private String email;

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
	 * 分部名称
	 */
	private String branchName;

	/**
	 * 部门ID
	 */
	private Integer deptId;

	/**
	 * 部门名称
	 */
	private String deptName;
	
	/**
	 * 职位ID
	 */
	private Integer positionId;

	/**
	 * 职位名称
	 */
	private String positionName;
	
	/**
	 * 是否管理员(根据所属公司授权的模块获取所有权限)
	 */
	private YesNoFlag isAdmin;

	/**
	 * 创建人
	 */
	private Integer createBy;

	/**
	 * 创建人名
	 */
	private String createByName;
	
	/**
	 * 创建日期
	 */
	private Date createDate;

	/**
	 * 更新人
	 */
	private Integer updateBy;

	/**
	 * 更新人名
	 */
	private String updateByName;
	
	/**
	 * 最近更新时间
	 */
	private Date updateDate;
	
	/**
	 * 激活状态
	 */
	private YesNoFlag isDeleted;

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

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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

	public String getBranchName() {
		return branchName;
	}

	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}

	public Integer getDeptId() {
		return deptId;
	}

	public void setDeptId(Integer deptId) {
		this.deptId = deptId;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public Integer getPositionId() {
		return positionId;
	}

	public void setPositionId(Integer positionId) {
		this.positionId = positionId;
	}

	public String getPositionName() {
		return positionName;
	}

	public void setPositionName(String positionName) {
		this.positionName = positionName;
	}

	public YesNoFlag getIsAdmin() {
		return isAdmin;
	}

	public void setIsAdmin(YesNoFlag isAdmin) {
		this.isAdmin = isAdmin;
	}

	public Integer getCreateBy() {
		return createBy;
	}

	public void setCreateBy(Integer createBy) {
		this.createBy = createBy;
	}

	public String getCreateByName() {
		return createByName;
	}

	public void setCreateByName(String createByName) {
		this.createByName = createByName;
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

	public String getUpdateByName() {
		return updateByName;
	}

	public void setUpdateByName(String updateByName) {
		this.updateByName = updateByName;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public YesNoFlag getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(YesNoFlag isDeleted) {
		this.isDeleted = isDeleted;
	}


	@Override
	public void convertPOToVO(Object poObj) {
		if(poObj instanceof User) {
			User user = (User)poObj;
			this.id = user.getId();
			this.companyId = user.getCompanyId();
			this.mobile = user.getMobile();
			this.name = user.getName();
			this.login = user.getLogin();
			this.email = user.getEmail();
			this.memo = user.getMemo();
			this.emailVerified = user.getEmailVerified();
			this.mobileVerified = user.getMobileVerified();
			this.lastLoginDate = user.getLastLoginDate();
			this.locked = user.getLocked();
			this.lastLockDate = user.getLastLockDate();
			this.branchId = user.getBranchId();
			this.deptId = user.getDeptId();
			this.positionId = user.getPositionId();
			this.isAdmin = user.getIsAdmin();
			this.isDeleted = user.getIsDeleted();
			this.createBy = user.getCreateBy();
			this.createDate = user.getCreateDate();
			this.updateBy = user.getUpdateBy();
			this.updateDate = user.getUpdateDate();
		}
	}
	
	public User convertVOToPO(UserVO vo){
		User user = new User();
		user.setId(vo.getId());
		user.setCompanyId(vo.getCompanyId());
		user.setMobile(vo.getMobile());
		user.setName(vo.getName());
		String login = vo.getLogin();
		if (StringUtils.isNotBlank(login)) {
			login = login.trim();
			user.setLogin(login);
			user.setLowerLogin(login.toLowerCase());
		}
		String email = vo.getEmail();
		if (StringUtils.isNotBlank(email)) {
			email = email.trim();
			user.setEmail(email);
			user.setLowerEmail(email.toLowerCase());
		}
		user.setMemo(vo.getMemo());
		user.setBranchId(vo.getBranchId());
		user.setDeptId(vo.getDeptId());
		user.setPositionId(vo.getPositionId());
		user.setLocked(vo.getLocked());
		user.setIsAdmin(vo.getIsAdmin());
		user.setIsDeleted(vo.getIsDeleted());
		return user;
	}

}
