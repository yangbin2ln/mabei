package com.insproject.web.sites.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.insplatform.core.http.Condition;
import com.insplatform.spring.jdbc.JdbcAssistant;
import com.insproject.common.controller.InsBaseController;
import com.insproject.provider.module.index.service.IndexService;

@Controller
public class IndexController extends InsBaseController{	
	
	@Autowired
	protected JdbcAssistant jdbcAssistant;	
	
	@Autowired
	protected IndexService indexService;	
	
	@RequestMapping("index")
	public String main(HttpServletRequest request, Map<String,Object> map){		
		Condition condition = new Condition(request);
//		Map<String, Object> data = indexService.getIndexData(condition);
//		map.put("data", data);
		return "index";
	}
 
	
} 
