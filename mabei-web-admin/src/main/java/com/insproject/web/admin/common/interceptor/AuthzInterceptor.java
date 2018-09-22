package com.insproject.web.admin.common.interceptor;


import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.insplatform.core.http.messager.Messager;
import com.insplatform.core.utils.TextUtil;
import com.insplatform.core.utils.WebUtil;
import com.insproject.provider.system.service.OperateService;
import com.insproject.web.admin.common.curruser.CurrentUser;
import com.insproject.web.admin.common.curruser.UserSession;


/**
 * 登录验证
 * @author guom
 *
 */
public class AuthzInterceptor  extends HandlerInterceptorAdapter {
	
	private Logger logger = Logger.getLogger(AuthzInterceptor.class);
	
	@Autowired
	@Qualifier("OperateServiceImpl")
	private OperateService operateService;
	
	//需要排除的页面
	public static List<String> excludedPageArray;
	
	static {
		excludedPageArray = new ArrayList<String>();	
		excludedPageArray.add("/locale");							//国际化
		excludedPageArray.add("/login");							//登陆页面
		excludedPageArray.add("/captcha");							//验证码		
		excludedPageArray.add("/errorHandler");						//错误处理
	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
		boolean isExcluded = false;	
				
		//如果没指定目录地址，直接跳转首页
		if(TextUtil.isEmpty(request.getServletPath()) || request.getServletPath().equals("/")){
			response.sendRedirect(request.getContextPath() + "/main");
			return false;
		}else{
			//如果指定了目录地址，判断请求是否是例外			
			Iterator<String> iter = excludedPageArray.iterator();				
			while(iter.hasNext()){
				String excluded = iter.next();	
				if(request.getServletPath().startsWith(excluded)){
					isExcluded = true;
				}			
			}
		}
		
		//如果不是例外，进行session校验
		if(!isExcluded){
			CurrentUser user = UserSession.getCurrentUser(request);
			if(user == null){				
				//处理AJAX请求
				if(WebUtil.isAjax(request)){
					 response.setHeader("sessionStatus", "timeout"); 
					 Messager.getJsonMessager().error().put("sessionStatus", "timeout").send(response);					
				}else{	
					//一般请求
					response.sendRedirect(request.getContextPath() + "/login");
				}	
				return false;
			}else{
				//处理用户实际是否具有此资源的访问权限
				String servletPath = request.getServletPath();
				List<String> allOperateResources = operateService.loadAllOperateResources();
				List<String> userOperateResources = operateService.loadUserOperateResources(user.getId());
				if(allOperateResources.contains(servletPath) && !userOperateResources.contains(servletPath)){
					logger.info("无操作权限！");
					//处理AJAX请求
					if(WebUtil.isAjax(request)){
						 response.setHeader("authzStatus", "no"); 
						 Messager.getJsonMessager().error().put("authzStatus", "no").send(response);					
					}else{	
						//一般请求
						response.sendRedirect(request.getContextPath() + "/main");
					}	
					return false;
				}
			}			
		}
				
		
		return true;
	}

	

}
