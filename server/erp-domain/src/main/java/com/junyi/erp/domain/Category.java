package com.junyi.erp.domain;

import java.util.Date;

public class Category {
    /**
     * 
     */
    private Integer id;

    /**
     * 分类名称
     */
    private String name;

    /**
     * 所属栏目ID
     */
    private Integer columnId;

    /**
     * 上级分类ID
     */
    private Integer upClassId;

    /**
     * 1是启用，0不启用
     */
    private Integer status;

    /**
     * 
     */
    private Integer createBy;

    /**
     * 
     */
    private Date createDate;

    /**
     * 
     */
    private Integer updateBy;

    /**
     * 
     */
    private Date updateDate;

    /**
     * 分级
     */
    private int leaf;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getColumnId() {
        return columnId;
    }

    public void setColumnId(Integer columnId) {
        this.columnId = columnId;
    }

    public Integer getUpClassId() {
        return upClassId;
    }

    public void setUpClassId(Integer upClassId) {
        this.upClassId = upClassId;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
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

    public int getLeaf() {
        return leaf;
    }

    public void setLeaf(int leaf) {
        this.leaf = leaf;
    }
}