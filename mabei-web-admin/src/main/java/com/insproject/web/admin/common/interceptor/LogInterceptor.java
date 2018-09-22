package com.insproject.web.admin.common.interceptor;

import java.sql.Timestamp;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.insplatform.core.utils.JsonUtil;
import com.insplatform.core.utils.SecurityUtil;
import com.insplatform.core.utils.TextUtil;
import com.insplatform.core.utils.WebUtil;
import com.insproject.provider.system.SystemConstant;
import com.insproject.provider.system.entity.Log;
import com.insproject.provider.system.service.LogService;
import com.insproject.provider.system.service.OperateService;
import com.insproject.web.admin.common.curruser.CurrentUser;
import com.insproject.web.admin.common.curruser.UserSession;

/**
 * 记录日志
 * 
 * @author guom
 *
 */
public class LogInterceptor implements HandlerInterceptor {

	private Logger logger = Logger.getLogger(LogInterceptor.class);
	
	@Autowired
	private LogService logService;
	
	@Autowired
	private OperateService operateService;

	private ThreadLocal<Long> startTime = new ThreadLocal<Long>();
	private ThreadLocal<Long> endTime = new ThreadLocal<Long>();

	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		logger.info(request.getServletPath());
		
		// 设置开始时间
		startTime.set(System.currentTimeMillis());
		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {		
		
	}
	

	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		
		CurrentUser currentUser = UserSession.getCurrentUser(request);
		
		// 设置结束时间
		endTime.set(System.currentTimeMillis());
		
		Log logBean = new Log();

		logBean.setExecTimemillis(endTime.get() - startTime.get());
		logBean.setCreateTime(new Timestamp(System.currentTimeMillis()));
		logBean.setCreateUserId((currentUser == null) ? null : currentUser.getId());
		logBean.setCreateUserName((currentUser == null) ? null : currentUser.getName());
		logBean.setIp(WebUtil.getIpAddr(request));
		
		Map<String, String> reqMap = WebUtil.getParameterMap(request);
		//如果参数中含有密码，则将密码加密后在存日志
		if (reqMap.get("password") != null) {
			reqMap.put("password", SecurityUtil.getMD5Str((reqMap.get("password") + "")));
		}
		logBean.setParams(JsonUtil.toJson(reqMap));				
	
		//设置logBena的operate
		if (handler instanceof HandlerMethod) {			
			String requestUrl = request.getServletPath();	
			setLogOperate(logBean, requestUrl);	
		}
		
		//记录日志
		if(ex != null){			
			logger.error("[系统出现错误,已记录到系统日志,错误信息如下]:", ex);			
			logBean.setType(SystemConstant.LogConstant.ERROR.getType());			
			logBean.setErrorDetails(TextUtil.getExceptionDetails(ex));					
			logService.saveLog(logBean);	
		}else{			
			String nolog = request.getParameter("nolog");			
			if(TextUtil.isEmpty(nolog) && logBean.getIsLog().equals(1)){
				logBean.setType(SystemConstant.LogConstant.SYS.getType());
				logService.saveLog(logBean);	
			}	
		}
			
	}

	/**
	 * 设置logBena的operate
	 * @param logBean
	 * @return
	 */
	private Log setLogOperate(Log logBean, String requestUrl){
		String operateId = null;
		String operateCode = null;
		Integer isLog = 0;
		Map<String, Map<String, Object>> operateMap = operateService.loadAllOperateMap();
		Set<String> keys = operateMap.keySet();
		for(String key : keys){
			Map<String, Object> operate = operateMap.get(key);
			String operUrls = operate.get("resourcePath").toString();
			if(operUrls.indexOf(",") == -1){
				if(requestUrl.equals(operUrls)){
					operateId = operate.get("id").toString();
					operateCode = operate.get("code").toString();
					isLog = (Integer) operate.get("isLog");
				}
			}else{
				for(String operUrl : operUrls.split(",")){
					if(requestUrl.equals(operUrl)){
						operateId = operate.get("id").toString();
						operateCode = operate.get("code").toString();
						isLog = (Integer) operate.get("isLog");
					}
				}
			}
			if(TextUtil.isNotEmpty(operateId) && TextUtil.isNotEmpty(operateCode)){
				break;
			}
		}
		
		logBean.setOperateId(operateId);
		logBean.setOperateCode(operateCode);		
		logBean.setIsLog(isLog);
		
		return logBean;
	}

}
