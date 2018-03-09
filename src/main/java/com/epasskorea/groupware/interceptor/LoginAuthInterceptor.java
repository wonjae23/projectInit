/**
 * Copyright (c) 2013 EPASSKOREA. All Rights Reserved.
  * Project: Epasskorea B2B LMS Renewal(2013.07~)
*/

package com.epasskorea.groupware.interceptor;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.epasskorea.groupware.common.MessageViewer;

/**
 * Class Name : LoginAuthInterceptor
 * Description : Login Authentication interceptor
 * Modification Information
 * Date			    Autor					Contents
 * -----------  --------------  --------------------------------
 * 2018.03.00   pwj	 	    	
 * 
 * @author: pwj
 * @version: 1.0
*/
public class LoginAuthInterceptor implements HandlerInterceptor  {

	private final Log log = LogFactory.getLog(getClass());
			
	
	/**
	 * Operator Login Session Check
	 */
	@SuppressWarnings("unchecked")
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		log.debug("## LoginAuthInterceptor preHandle");		
		String reqUrl = String.valueOf(request.getRequestURL());
		log.debug("## [LoginAuthInterceptor preHandle] reqUrl =>" + reqUrl);
		
		if(reqUrl.indexOf("/login.do")>-1 || reqUrl.indexOf("/loginOk.do")>-1 || reqUrl.indexOf("mo/interface.do")>-1 || reqUrl.indexOf("/checkplus/process.do")>-1 || reqUrl.indexOf("/checkplus/error.do")>-1){	//인증실패시 login으로 redirect처리에 대한 예외, mo/interface으로 모바일 클라우드 연동 회원,컨텐츠 동기화에 대한 예외
			return true;
		}

		Map<String,String> loginSession = (Map<String,String>)request.getSession().getAttribute("OperatorGroupWareSession");
		
		if(loginSession == null){
			MessageViewer.alert(response, "인증실패!", "로그인 하세요.", "/login.do", false, false, false, "");
			return false;
		}else{
		   	return true;
		}
    }

	@Override
	public void afterCompletion(HttpServletRequest arg0,
			HttpServletResponse arg1, Object arg2, Exception arg3)
			throws Exception {
		log.debug("## LoginAuthInterceptor afterCompletion");
	}

	@Override
	public void postHandle(HttpServletRequest arg0,
			HttpServletResponse arg1, Object arg2, ModelAndView arg3)
			throws Exception {
		log.debug("## LoginAuthInterceptor postHandle");
	}
		
}