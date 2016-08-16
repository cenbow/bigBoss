package com.junyi.erp.vo;

import com.junyi.ecommerce.core.util.BeanCopierUtil;
import com.junyi.ecommerce.core.util.vo.BaseVO;
import com.junyi.erp.domain.Account;
import com.junyi.erp.domain.Role;

/**
 * Created by xww on 2016/8/13.
 */
public class RoleVO extends Role implements BaseVO {
    @Override
    public void convertPOToVO(Object o) {
        if(o instanceof Role){
            Role role = (Role) o;
            BeanCopierUtil.copyProperties(role,this);
        }
    }
}
