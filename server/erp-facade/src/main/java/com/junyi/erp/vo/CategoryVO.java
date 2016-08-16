package com.junyi.erp.vo;

import com.junyi.ecommerce.core.util.vo.BaseVO;
import com.junyi.erp.domain.Category;

/**
 * Created by xww on 2016/8/16.
 */
public class CategoryVO implements BaseVO {
    private String name;

    private String columnCode;

    private int columnId;

    private int upClassId;

    private int status;

    private int leaf;

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

    @Override
    public void convertPOToVO(Object o) {
        if(o instanceof Category){
            Category category = (Category) o;
            this.name = category.getName();
            this.columnId = category.getColumnId();
            this.upClassId = category.getUpClassId();
            this.status = category.getStatus();
            this.leaf = category.getLeaf();
        }
    }

    public Category convertVOToPO(){
        Category po = new Category();
        po.setName(this.getName());
        po.setColumnId(this.getColumnId());
        po.setStatus(this.getStatus());
        po.setLeaf(this.getLeaf());
        po.setUpClassId(this.getUpClassId());
        return po;
        
    }
}
