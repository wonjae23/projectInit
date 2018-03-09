/**
 * Copyright (c) 2013 EPASSKOREA. All Rights Reserved.
  * Project: Epasskorea B2B LMS Renewal(2013.07~)
*/
package com.epasskorea.groupware.util;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/** 
 * Class Name : CookieUtil
 * Description : 쿠키(cookie)를 읽고 쓰는 유틸리티.
 * Modification Information
 * Date			    Autor					Contents
 * -----------  --------------  --------------------------------
 * 2012.06.00   dolcoms	 	    	
 * 
 * @author: dolcoms
 * @version: 1.0
*/
public final class CookieUtil {

    private CookieUtil() {
        // Utility class, hide the constructor.
    }

    /**
     * Retrieve the cookie value from the given servlet request based on the
     * given cookie name.
     * @param request : The HttpServletRequest to be used.
     * @param name : The cookie name to retrieve the value for.
     * @return The cookie value associated with the given cookie name.
     * @throws UnsupportedEncodingException 
     */
    public static String getCookieValue(HttpServletRequest request, String name) {
    	Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie != null && name.equals(cookie.getName())) {
                	String value = cookie.getValue();
					try {
						value = URLDecoder.decode(value, "UTF-8");
					} catch (UnsupportedEncodingException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
                    return value;
                    //return cookie.getValue();
                }
            }
        }
        return null;
    }

    /**
     * Set the cookie value in the given servlet response based on the given
     * cookie name and expiration interval.
     * @param response : The HttpServletResponse to be used.
     * @param name : The cookie name to associate the cookie value with.
     * @param value : The actual cookie value to be set in the given servlet response.
     * @param maxAge : The expiration interval in seconds. If this is set to 0, then
     *                 the cookie will immediately expire.
     * @throws UnsupportedEncodingException 
     */
    public static void setCookieValue(HttpServletResponse response, String name, String value,
            int maxAge, String domain) {
        
    	if(value != null){
    		try {
				value = URLEncoder.encode(value, "UTF-8");
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
    	}
       	//System.out.println("name : " + name + ", value : " + value);
       	
        Cookie cookie = new Cookie(name, value);
        if (domain != null) {
            cookie.setDomain(domain);
        }
        cookie.setMaxAge(maxAge);
        cookie.setPath("/");
        response.addCookie(cookie);
    }

    /**
     * Remove the cookie from the given servlet response based on the given
     * cookie name. It actually sets the cookie expiration interval to zero,
     * resulting the cookie being expired immediately.
     * @param response : The HttpServletResponse to be used.
     * @param name : The cookie name of the cookie to be removed.
     * @throws UnsupportedEncodingException 
     */
    public static void removeCookie(HttpServletResponse response, String name) {
        setCookieValue(response, name, null, 0, null);
    }
}
