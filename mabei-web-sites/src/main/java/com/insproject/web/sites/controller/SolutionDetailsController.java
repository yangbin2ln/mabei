package com.insproject.web.sites.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.insproject.common.controller.InsBaseController;
import com.insproject.provider.module.solutiondetails.service.SolutionDetailsService;

/**
 * 行业解决方案维护
 * @author yangbin
 *
 */
@Controller
@RequestMapping("/solution")
public class SolutionDetailsController extends InsBaseController{
	
	@Autowired
	@Qualifier("SolutionDetailsServiceImpl")
	private SolutionDetailsService solutionDetailsService;
	
	@RequestMapping("/{id}")
	public String load(@PathVariable("id") String id, Map<String, Object> data){	
		Map<String, Object> map = solutionDetailsService.load(id);
		data.put("content", map.get("content"));
		data.put("title", map.get("title"));
		data.put("preTitle", "解决方案");
		data.put("headTitle", map.get("tradeClassifyName") + "信息化解决方案");
		data.put("preUrl", "/#porject");
		return "details";
	}
	
}
