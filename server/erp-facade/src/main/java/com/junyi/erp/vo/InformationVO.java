package com.junyi.erp.vo;

import com.junyi.ecommerce.core.util.BeanCopierUtil;
import com.junyi.ecommerce.core.util.vo.BaseVO;
import com.junyi.erp.domain.Information;
import com.junyi.erp.service.user.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created by xww on 2016/8/22.
 */
public class InformationVO extends Information implements BaseVO {

    @Autowired
    private CompanyService companyService;


    @Override
    public void convertPOToVO(Object o) {
        if(o instanceof Information){
            Information information = (Information)o;
            BeanCopierUtil.copyProperties(this, information);
        }
    }
}
