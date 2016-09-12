package com.junyi.erp.param;

import com.junyi.ecommerce.core.mybatis.page.PageRequest;
import com.junyi.erp.domain.Column;
import org.apache.commons.lang3.StringUtils;

public class CategorySearchParam extends PageParam {

    /**
     * 用户名
     */
    private String text;

    /**
     * @return
     */
    private Integer columnId;

    private Integer upClassId;

    public Integer getUpClassId() {
        return upClassId;
    }

    public void setUpClassId(Integer upClassId) {
        this.upClassId = upClassId;
    }

    public Integer getColumnId() {
        return columnId;
    }

    public void setColumnId(Integer columnId) {
        this.columnId = columnId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    @Override
    public PageRequest toPageRequest() {
        PageRequest pageRequest = super.toPageRequest();
        pageRequest.putFilterIfNotNull("text", this.text);
        if (this.columnId != null && this.columnId != 0) {
            pageRequest.putFilterIfNotNull("columnId", this.columnId);
        }
        if (this.upClassId != null && this.upClassId != 0) {
            pageRequest.putFilterIfNotNull("upClassId", this.upClassId);
        }
        if (StringUtils.isNotBlank(this.text)) {
            pageRequest.putFilterIfNotNull("lowerText", this.text.toLowerCase());
        }
        return pageRequest;
    }
}
