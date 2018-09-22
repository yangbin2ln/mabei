package com.insproject.web.sites.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.insproject.common.controller.InsBaseController;
import com.insproject.provider.module.successcase.service.SuccessCaseService;

/**
 * 行业成功案例
 * @author yangbin
 *
 */
@Controller
@RequestMapping("/successcase")
public class SuccessCaseController extends InsBaseController{
	
	@Autowired
	@Qualifier("SuccessCaseServiceImpl")
	private SuccessCaseService successCaseService;
	
	@RequestMapping("/{id}")
	public String load(@PathVariable("id") String id, Map<String, Object> data){	
		Map<String, Object> map = successCaseService.load(id);
		data.put("content", map.get("content"));
		data.put("title", map.get("title"));
		data.put("preTitle", "成功案例");
		data.put("headTitle", map.get("tradeClassifyName") + "管理软件");
		data.put("preUrl", "/#cases");
		return "details";
	}
}
