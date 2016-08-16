package com.junyi.erp.vo;

import com.junyi.ecommerce.core.util.BeanCopierUtil;
import com.junyi.ecommerce.core.util.vo.BaseVO;
import com.junyi.erp.domain.Account;
import com.junyi.erp.domain.Company;

/**
 * Created by xww on 2016/8/14.
 */
public class CompanyVO extends Company implements BaseVO {
    @Override
    public void convertPOToVO(Object o) {
        if(o instanceof Company){
            Company company = (Company)o;
            BeanCopierUtil.copyProperties(this,company);
        }
    }

    public Company convertVOToPO(){
        Company company = new Company();
        BeanCopierUtil.copyProperties(company,this);
        return company;
    }
}
