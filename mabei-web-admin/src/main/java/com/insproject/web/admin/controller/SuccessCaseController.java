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
import com.insproject.provider.module.successcase.entity.SuccessCase;
import com.insproject.provider.module.successcase.service.SuccessCaseService;
import com.insproject.web.admin.common.curruser.CurrentUser;
import com.insproject.web.admin.common.curruser.UserSession;

/**
 * 行业成功案例
 * @author yangbin
 *
 */
@Controller
@RequestMapping("/project/successcase")
public class SuccessCaseController extends InsBaseController{
	
	@Autowired
	@Qualifier("SuccessCaseServiceImpl")
	private SuccessCaseService successCaseService;
	
	/**
	 * 加载数据
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/loadAllGrid")
	public @ResponseBody Map<String, Object> loadAllGrid(
			HttpServletRequest request, HttpServletResponse response){
		Condition condition = new Condition(request, "title", "state", "tradeClassifyId");
		return successCaseService.loadAllGrid(condition);
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
		return jsonMessager.success().data(successCaseService.loadAllList(condition));
	}	
	
	
	/**
	 * 加载单条数据
	 * @param id
	 * @return
	 */
	@RequestMapping("/load")
	public @ResponseBody Map<String, Object> load(@RequestParam("id") String id){	
		JsonMessager jsonMessager = new JsonMessager();
		return jsonMessager.success().data(successCaseService.load(id));		
	}
	
	/**
	 * 新增
	 * @param dict
	 * @return
	 */
	@RequestMapping("/add")	
	public @ResponseBody Map<String, Object> add(SuccessCase successcase, HttpServletRequest request){
		JsonMessager jsonMessager = new JsonMessager();
		CurrentUser user = UserSession.getCurrentUser(request);
		successcase.setCreateTime(new Date());
		successcase.setUpdateTime(new Date());
		successcase.setCreateUserId(Integer.parseInt(user.getId()));
		successCaseService.save(successcase);
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
		SuccessCase successcase = successCaseService.get(id);
		this.bindObject(request, successcase);
		successcase.setUpdateTime(new Date());
		successCaseService.update(successcase);
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
		successCaseService.deleteByIds(ids);
		return jsonMessager.success();
	}
	
	/**
	 * 发布/撤销发布
	 * @param request
	 * @param state
	 * @return
	 */
	@RequestMapping("/publish/{state}")	
	public @ResponseBody Map<String, Object> publish(HttpServletRequest request, @PathVariable String state){
		JsonMessager jsonMessager = new JsonMessager();
		String [] ids = this.getSelectedItems(request, null);
		successCaseService.updateState(ids, state);
		return jsonMessager.success();
	}
	
}
