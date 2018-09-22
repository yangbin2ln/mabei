package com.insproject.web.sites.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.insproject.common.controller.InsBaseController;
import com.insproject.provider.module.news.service.NewsService;

/**
 * 新闻维护
 * @author yangbin
 *
 */
@Controller
@RequestMapping("/news")
public class NewsController extends InsBaseController{
	
	@Autowired
	@Qualifier("NewsServiceImpl")
	private NewsService newsService;
	
	 
	@RequestMapping("/{id}")
	public String load(@PathVariable("id") String id, Map<String, Object> data){	
		Map<String, Object> map = newsService.load(id);
		data.put("content", map.get("content"));
		data.put("title", map.get("title"));
		data.put("preTitle", "新闻动态");
		data.put("headTitle", "西软新闻");
		data.put("preUrl", "/#news");
		return "details";
	}
}
