package com.junyi.erp.vo;

import com.junyi.ecommerce.core.util.BeanCopierUtil;
import com.junyi.ecommerce.core.util.vo.BaseVO;
import com.junyi.erp.domain.Account;

/**
 * Created by xww on 2016/8/13.
 */
public class AccountVO extends Account implements BaseVO {
    @Override
    public void convertPOToVO(Object o) {
        if(o instanceof Account){
            Account account = (Account)o;
            BeanCopierUtil.copyProperties(this,account);
        }
    }

    public Account convertVOToPO(){
        Account account = new Account();
        BeanCopierUtil.copyProperties(account,this);
        return account;
    }
}
