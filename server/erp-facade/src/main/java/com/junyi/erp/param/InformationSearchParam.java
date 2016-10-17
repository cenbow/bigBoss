package com.junyi.erp.param;

import com.junyi.ecommerce.core.mybatis.page.PageRequest;
import org.apache.commons.lang3.StringUtils;

public class InformationSearchParam extends PageParam {


    private String text;

    private Integer companyId;

    private Integer firstLevel;

    private Integer secondLevel;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    public Integer getFirstLevel() {
        return firstLevel;
    }

    public void setFirstLevel(Integer firstLevel) {
        this.firstLevel = firstLevel;
    }

    public Integer getSecondLevel() {
        return secondLevel;
    }

    public void setSecondLevel(Integer secondLevel) {
        this.secondLevel = secondLevel;
    }

    @Override
    public PageRequest toPageRequest() {
        PageRequest pageRequest = super.toPageRequest();
        pageRequest.putFilterIfNotNull("text", this.text);
        if (StringUtils.isNotBlank(this.text)) {
            pageRequest.putFilterIfNotNull("lowerText", this.text.toLowerCase());
        }
        pageRequest.putFilterIfNotNull("companyId", this.companyId);
        pageRequest.putFilterIfNotNull("firstLevel", this.firstLevel);
        pageRequest.putFilterIfNotNull("secondLevel", this.secondLevel);
        return pageRequest;
    }
}
