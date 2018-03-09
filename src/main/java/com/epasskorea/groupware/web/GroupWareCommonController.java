/**
 * Copyright (c) 2013 EPASSKOREA. All Rights Reserved.
  * Project: Epasskorea B2B LMS Renewal(2013.07~)
*/
package com.epasskorea.groupware.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.epasskorea.groupware.common.MessageViewer;
import com.epasskorea.groupware.service.system.GroupWareOperatorService;
import com.epasskorea.groupware.util.StringUtil;

 
 
/**
 * Class Name : GroupWareCommonController
 * Description : GroupWare common controller, 공통영역 controller class
 * Modification Information
 * Date			    Autor					Contents
 * -----------  --------------  --------------------------------
 * 2018.03.00   pwj	 	    	
 * 
 * @author: chosungwoo
 * @version: 1.0
*/
@Controller
public class GroupWareCommonController {
			 
	private final Log log = LogFactory.getLog(getClass());
	
	@Resource(name="groupWareOperatorService") private GroupWareOperatorService groupWareOperatorService;
	
	
	/**
	 * Description : 로그인
	 * @throws Exception
	 * @param 
	 * @return ModelAndView
	 */	
	@RequestMapping(value="/login.do")
	public ModelAndView goLogin(HttpServletRequest request,  HttpServletResponse response, Map<String, Object> commandMap) throws Exception{				
		ModelAndView mav = new ModelAndView();		
	
		mav.setViewName("login");
		return mav;
	}
	
	
	
	/**
	 * Description : 로그인 처리
	 * @throws Exception
	 * @param 
	 * @return ModelAndView
	 */
	
	@RequestMapping(value="/loginOk.do", method = RequestMethod.POST)
	public String loginOk(HttpServletRequest request, HttpServletResponse response,  Map<String, Object> commandMap) throws Exception{
	
		String loginId = (String)commandMap.get("LOGINID");
		String loginPwd = (String)commandMap.get("LOGINPWD");		
				
		//입력정보 체크
		if(StringUtil.getNullCheck(loginId) || StringUtil.getNullCheck(loginPwd)){
			MessageViewer.alert(response, "로그인 실패", "아이디/패스워드를 입력하세요.", "login.do", false, false, false, "");
		}else{		
			Map<String,String> operatorInfo = (Map<String,String>)groupWareOperatorService.getGwLoginInfo(commandMap);
			System.out.println("11111111111111111111:"+operatorInfo);
			//Operator 미등록
			if(operatorInfo == null){		
				MessageViewer.alert(response, "로그인 실패", "운영자 정보가 없습니다. 확인 후 다시 시도하여 주세요.", "login.do", false, false, false, "");
			}else{	

					//password 일치 : 로그인 성공
					if(!StringUtil.getNullCheck(loginPwd) && loginPwd.equals(operatorInfo.get("UserPWD"))){
						//Operator session create
						Map<String,String> GroupWareloginSession = new HashMap<String,String>();
						GroupWareloginSession.put("ADMINIDX", String.valueOf(operatorInfo.get("MemberID")));			//Operator IDX
						GroupWareloginSession.put("ADMINNAME", operatorInfo.get("NAME"));						//Operator Name
						GroupWareloginSession.put("ADMINID", String.valueOf(operatorInfo.get("UserID")));	
						GroupWareloginSession.put("ADMINPWD", String.valueOf(operatorInfo.get("UserPWD")));			//Operator pwd --> 암호화 할것
						GroupWareloginSession.put("ADMINEMAIL", operatorInfo.get("email"));						//Operator EMAIL	
						GroupWareloginSession.put("ADMINTEL", operatorInfo.get("phone"));							//Operator TEL						
						
						request.getSession().setAttribute("OperatorGroupWareSession", GroupWareloginSession);
						return ("redirect:/main.do");																			
						
					}else{
						MessageViewer.alert(response, "로그인 실패", "입력정보가 정확하지 않습니다.", "login.do", false, false, false, "");					
					}
				
			}		
		}
			
		return null;
	}
	
	
	/**
	 * Description : main
	 * @throws Exception
	 * @param 
	 * @return ModelAndView
	 */
	@RequestMapping(value="/main.do")
	public ModelAndView goMain(HttpServletRequest request,  Map<String, Object> commandMap) throws Exception{				
		ModelAndView mav = new ModelAndView();		
		
		mav.setViewName("main");
		return mav;
	}
	
	
	
}
