/**
 * Copyright (c) 2013 EPASSKOREA. All Rights Reserved.
  * Project: Epasskorea B2B LMS Renewal(2013.07~)
*/
package com.epasskorea.groupware.service.system.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import com.epasskorea.groupware.dao.CommonLMSDAO;
import com.epasskorea.groupware.service.system.GroupWareOperatorService;


/**
 * Class Name : GroupWareOperatorServiceImpl
 * Description : GroupWare Operator Service implements
 * Modification Information
 * Date			    Autor					Contents
 * -----------  --------------  --------------------------------
 * 2018.03.00   pwj	 	    	
 * 
 * @author: pwj
 * @version: 1.0
*/
@Service("groupWareOperatorService")
public class GroupWareOperatorServiceImpl implements GroupWareOperatorService {
	
	private final Log log = LogFactory.getLog(getClass());
	
	//LMS 공통 DAO Resource 객체 
	@Resource(name="commonLMSDAO") private CommonLMSDAO commonLMSDAO;
	
	
	/**
	 * get Operator Login info 
	 * @param params
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public Map<String,String> getGwLoginInfo(Map<String,Object> params) throws Exception{
		return (Map<String,String>)commonLMSDAO.select("groupWareOperator.selectOperatorLoginInfo", params);	
	}

	
}
	