package com.epasskorea.groupware.common;

import java.text.SimpleDateFormat;
import java.util.Date;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.support.WebBindingInitializer;
import org.springframework.web.context.request.WebRequest;

/**  
 * @Class Name : EgovBindingInitializer.java
 * @Description : EgovBindingInitializer Class
 * @Modification Information  
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2009.03.16           최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see
 * 
 *  Copyright (C) by MOPAS All right reserved.
 */
public class EgovBindingInitializer implements WebBindingInitializer {

    /**
        * initBinder
    * @param binder
    * @param request
    * @see 개발프레임웍크 실행환경 개발팀
    */
        public void initBinder(WebDataBinder binder, WebRequest request) {
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                dateFormat.setLenient(false);
                binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, false));
                binder.registerCustomEditor(String.class, new StringTrimmerEditor(false));
        }

}
