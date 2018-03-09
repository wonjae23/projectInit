/**
 * Copyright (c) 2013 EPASSKOREA. All Rights Reserved.
  * Project: Epasskorea B2B LMS Renewal(2013.07~)
*/
package com.epasskorea.groupware.service.system;

import java.util.List;
import java.util.Map;


/**
 * Class Name : GroupWareOperatorService
 * Description : GroupWare Operator Service
 * Modification Information
 * Date			    Autor					Contents
 * -----------  --------------  --------------------------------
 * 2018.03.00   pwj	 	    	
 * 
 * @author: pwj
 * @version: 1.0
*/
public interface GroupWareOperatorService {
	
	/**
	 * get Operator Login info 
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public Map<String,String> getGwLoginInfo(Map<String,Object> params) throws Exception;
	
	
}
	