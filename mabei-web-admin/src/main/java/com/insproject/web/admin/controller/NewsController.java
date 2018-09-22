package com.insproject.web.admin.controller;

import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.insplatform.core.http.Condition;
import com.insplatform.core.http.messager.impl.JsonMessager;
import com.insproject.common.controller.InsBaseController;
import com.insproject.provider.module.news.entity.News;
import com.insproject.provider.module.news.service.NewsService;
import com.insproject.web.admin.common.curruser.CurrentUser;
import com.insproject.web.admin.common.curruser.UserSession;

/**
 * 新闻维护
 * @author yangbin
 *
 */
@Controller
@RequestMapping("/project/news")
public class NewsController extends InsBaseController{
	
	@Autowired
	@Qualifier("NewsServiceImpl")
	private NewsService newsService;
	
	/**
	 * 加载数据
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/loadAllGrid")
	public @ResponseBody Map<String, Object> loadAllGrid(
			HttpServletRequest request, HttpServletResponse response){
		Condition condition = new Condition(request, "title", "state");
		return newsService.loadAllGrid(condition);
	}
	
	/**
	 * 加载数据
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/loadAllList")
	public @ResponseBody Map<String, Object> loadAllList(
			HttpServletRequest request, HttpServletResponse response){
		Condition condition = new Condition(request);
		JsonMessager jsonMessager = new JsonMessager();
		return jsonMessager.success().data(newsService.loadAllList(condition));
	}	
	
	
	/**
	 * 加载单条数据
	 * @param id
	 * @return
	 */
	@RequestMapping("/load")
	public @ResponseBody Map<String, Object> load(@RequestParam("id") String id){	
		JsonMessager jsonMessager = new JsonMessager();
		return jsonMessager.success().data(newsService.load(id));		
	}
	
	/**
	 * 新增
	 * @param dict
	 * @return
	 */
	@RequestMapping("/add")	
	public @ResponseBody Map<String, Object> add(News news, HttpServletRequest request){
		JsonMessager jsonMessager = new JsonMessager();
		CurrentUser currentUser = UserSession.getCurrentUser(request);
		news.setCreateTime(new Date());
		news.setUpdateTime(new Date());
		news.setCreateUserId(Integer.parseInt(currentUser.getId()));
		newsService.save(news);
		return jsonMessager.success();
	}
	
	/**
	 * 编辑
	 * @param dict
	 * @return
	 */
	@RequestMapping("/update")	
	public @ResponseBody Map<String, Object> update(
		   @RequestParam("id") String id,
		   HttpServletRequest request){
		JsonMessager jsonMessager = new JsonMessager();
		News news = newsService.get(id);
		this.bindObject(request, news);
		news.setUpdateTime(new Date());
		newsService.update(news);
		return jsonMessager.success();
	}
	
	/**
	 * 删除
	 * @param request
	 * @return
	 */
	@RequestMapping("/delete")	
	public @ResponseBody Map<String, Object> delete(HttpServletRequest request){
		JsonMessager jsonMessager = new JsonMessager();
		String [] ids = this.getSelectedItems(request, null);
		newsService.deleteByIds(ids);
		return jsonMessager.success();
	}
	
	/**
	 * 发布/撤销发布新闻
	 * @param request
	 * @param state
	 * @return
	 */
	@RequestMapping("/publish/{state}")	
	public @ResponseBody Map<String, Object> publish(HttpServletRequest request, @PathVariable String state){
		JsonMessager jsonMessager = new JsonMessager();
		String [] ids = this.getSelectedItems(request, null);
		newsService.updateState(ids, state);
		return jsonMessager.success();
	}
	
}