/**
 * Copyright (c) 2013 EPASSKOREA. All Rights Reserved.
  * Project: Epasskorea B2B LMS Renewal(2013.07~)
*/
package com.epasskorea.groupware.common;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import com.epasskorea.groupware.util.StringUtil;


/**
 * Class Name : MessageViewer
 * Description : controller level에서의 alert message 출력
 * Modification Information
 * Date			    Autor					Contents
 * -----------  --------------  --------------------------------
 * 2016.6.12   chosungwoo	 	    	
 * 
 * @author: chosungwoo
 * @version: 1.0
*/
public class MessageViewer {
	//htmls
	private static String htmls = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">" +
								  "<html lang=\"ko\">" +
								  "<head><title></title>" +
								  "<link rel=\"stylesheet\" href=\"https://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css\">" +
								  "<script src=\"https://code.jquery.com/jquery-1.9.1.js\"></script>" +
								  "<script src=\"https://code.jquery.com/ui/1.10.3/jquery-ui.js\"></script>" +
								  "<style>body {" +
								  "	font-family: \"Trebuchet MS\", \"Helvetica\", \"Arial\",  \"Verdana\", \"sans-serif\";" +
								  "	font-size: 62.5%;" +
								  "}</style>";
	
	private static String htmle = "</head><body></body></html>";

		
	/**
	 * alert message 출력 및 window close, reload
	 * @param response	: HttpServletResponse 객체 - controller의 response 객체 전달
	 * @param alertTitle : alert title bar message - defalult : !!! 이패스코리아 LMS !!!
	 * @param msg : alert 출력 message
	 * @param redirecturl : redirect url - parameter 포함(GET방식)
	 * @param historyback : history.back() true/false
	 * @param selfClose : message 출력창 close (true/false) - self.close()
	 * @param reload : reload 여부(true/false)
	 * @param opener : reload 객체 지정 : alert message 출력창 reload시에는 '', parent창을 reload하고자 할경우에는 opener로 지정
	 * @throws IOException
	 */
	public static void alert(HttpServletResponse response, 
							 String alertTitle, 
							 String msg, 
							 String redirecturl, 
							 boolean historyback,
							 boolean selfClose,							 
							 boolean reload,
							 String opener) throws IOException{		
		
		
		String scripts = "<script>" + 
						 "$(function() {" +
						 "	$('#dialog').dialog({" +
						 " 		modal:true," +
						 " 		buttons: {" +
						 " 			Ok:function(){";
		String scripte = " 				$(this).dialog(\"close\");" +
						 " 			}" +
						 " 		}" +
						 "	});" +
						 "});" + 
						 "</script>";
		//layer start
		String flayer = "<div id=\"dialog\" title=";
		//layer end
		String blayer = "</p></div>";
		
		String sClose = "";
		String rLoad = "";
		String rUrl = "";
		String hBack = "";
		if(!StringUtil.getNullCheck(alertTitle)) flayer = flayer + "\"" + alertTitle + "\"><p>"; 			
		else flayer = flayer + "\"!!! 이패스코리아 LMS !!!\"><p>";
		if(!StringUtil.getNullCheck(redirecturl)){
			//login.do로 redirect시 popup 창 구별 및 처리
			if(redirecturl.equals("/login.do")){
				rUrl = "if(opener){" + 
							"opener.location.href=\""+ redirecturl + "\";" +
							"self.close();" +
						"}else{" +
							"location.href=\""+ redirecturl + "\";" +	
						"}";
			}else{
				rUrl = "location.href=\""+ redirecturl + "\";";
			}
		}
		if(historyback) hBack = "history.back();";
		if(selfClose) sClose = "self.close();";
		if(reload){
			rLoad = "window.location.reload(true);";
			if(!StringUtil.getNullCheck(opener))
				rLoad = opener + "." + rLoad;			
		}
		
		response.setContentType("text/html; charset=utf-8");
		response.getWriter().write(htmls + flayer + msg + blayer);
		response.getWriter().write(scripts);
		response.getWriter().write(rUrl);
		response.getWriter().write(hBack);
		response.getWriter().write(sClose);
		response.getWriter().write(rLoad);
		response.getWriter().write(scripte);		
		response.getWriter().write(htmle);				
	}

	
}