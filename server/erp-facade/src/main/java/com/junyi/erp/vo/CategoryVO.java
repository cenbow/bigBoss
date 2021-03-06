package com.junyi.erp.vo;

import com.junyi.ecommerce.core.util.vo.BaseVO;
import com.junyi.erp.domain.Category;

/**
 * Created by xww on 2016/8/16.
 */
public class CategoryVO implements BaseVO {
    private int id;

    private String name;

    private String columnCode;

    private int columnId;

    private int upClassId;

    private int status;

    private int leaf;

    private String categoryName;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColumnCode() {
        return columnCode;
    }

    public void setColumnCode(String columnCode) {
        this.columnCode = columnCode;
    }

    public int getColumnId() {
        return columnId;
    }

    public void setColumnId(int columnId) {
        this.columnId = columnId;
    }

    public int getUpClassId() {
        return upClassId;
    }

    public void setUpClassId(int upClassId) {
        this.upClassId = upClassId;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getLeaf() {
        return leaf;
    }

    public void setLeaf(int leaf) {
        this.leaf = leaf;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    @Override
    public void convertPOToVO(Object o) {
        if(o instanceof Category){
            Category category = (Category) o;
            this.id = category.getId();
            this.name = category.getName();
            this.columnId = category.getColumnId();
            if(category.getUpClassId()!=null){
                this.upClassId = category.getUpClassId();
            }
            this.status = category.getStatus();
            this.leaf = category.getLeaf();
            this.columnCode = category.getColumnCode();
            this.categoryName = category.getCategoryName();
        }
    }

    public Category convertVOToPO(){
        Category po = new Category();
        po.setId(this.getId());
        po.setName(this.getName());
        po.setColumnId(this.getColumnId());
        po.setStatus(this.getStatus());
        po.setLeaf(this.getLeaf());
        po.setUpClassId(this.getUpClassId());
        return po;
        
    }
}
