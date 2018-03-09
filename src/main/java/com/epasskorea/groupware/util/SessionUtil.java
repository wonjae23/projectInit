/**
 * Copyright (c) 2013 EPASSKOREA. All Rights Reserved.
  * Project: Epasskorea B2B LMS Renewal(2013.07~)
*/
package com.epasskorea.groupware.util;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

/**
 * Class Name : SessionUtil
 * Description : Session Utils
 * Modification Information
 * Date			    Autor					Contents
 * -----------  --------------  --------------------------------
 * 2014.04.00   dolcoms	 	    	
 * 
 * @author: dolcoms
 * @version: 1.0
*/
public class SessionUtil {
	private final static Log log = LogFactory.getLog("SessionUtil");
	/**
	 * String null check
	 * @param str : ASIGN,ENTR,EDIT,DEL,EXCL
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static boolean getCheckAuth(String type){
		boolean authCheck = false;
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();
		Map<String,String> auths = (Map<String,String>)request.getSession().getAttribute("AUTHS");
		if(auths != null) {
			log.debug("[## SessionUtil getCheckAuth]auths.get:AA_"+type +"==>"+ auths.get("AA_"+type));
			if(auths.get("AA_"+type).equals("Y")){
				authCheck = true;
			}			
		}
		return authCheck;
	}	
	
}