package com.insproject.provider.module.solutiondetails.repository.impl;

import java.io.Serializable;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.insplatform.spring.baseclass.repository.impl.BaseRepositoryImpl;
import com.insproject.provider.module.solutiondetails.repository.SolutionDetailsRepository;
import com.insproject.provider.aop.ClearRedisCache;
import com.insproject.provider.module.constant.NewsStateEnum;
import com.insproject.provider.module.solutiondetails.entity.SolutionDetails;

import com.insplatform.component.service.ext.grid.GridService;
import com.insplatform.core.http.Condition;


@Repository("SolutionDetailsRepositoryImpl")
public class SolutionDetailsRepositoryImpl extends BaseRepositoryImpl<SolutionDetails> implements SolutionDetailsRepository{
	
	@Autowired
	private GridService gridService;
	
	@Override
	public List<Map<String, Object>> loadAllList(Condition condition) {	
		String sql = "select t.* from t_solution_details t ";
		return jdbcAssistant.query(sql, condition.valueArray());
	}
	
	@Override
	public Map<String, Object> load(String id) {	
		String sql = "select t.*, tc.name trade_classify_name from t_solution_details t left join t_trade_classify tc on(tc.id = t.trade_classify_id) where t.id = ? ";
		return jdbcAssistant.queryOne(sql, new Object[]{id});
	}
	
	/**
	 * 重写父类get方法
	 */
	@Override
	public SolutionDetails get(Serializable id) {		
		return super.get(id);
	}
	
	/**
	 * 重写父类save方法
	 */
	@Override
	@ClearRedisCache("indexData")
	public Serializable save(SolutionDetails entity) {	
		return super.save(entity);
	}
	
	/**
	 * 重写父类update方法
	 */
	@Override
	@ClearRedisCache("indexData")
	public int update(SolutionDetails entity) {		
		return super.update(entity);
	}
	
	/**
	 * 重写父类deleteById方法
	 */
	@Override
	@ClearRedisCache("indexData")
	public int deleteById(Serializable id) {		
		return super.deleteById(id);
	}
	
	/**
	 * 重写父类deleteByIds方法
	 */
	@Override
	@ClearRedisCache("indexData")
	public int[] deleteByIds(Serializable[] ids) {		
		return super.deleteByIds(ids);
	}
	
	@Override
	public Map<String, Object> loadAllGrid(Condition condition) {
		List<Object> queryParams = new ArrayList<Object>();
		String sql = "select t.*, u.name create_user_name, tc.name trade_classify_name "
				   + " from t_solution_details t "
				   + " left join sys_user u on(u.id = t.create_user_id) "
				   + " left join t_trade_classify tc on(tc.id = t.trade_classify_id) where 1=1";
		
		if(condition.containsKey("state")){
			sql += " and t.state = ?";
			queryParams.add(condition.get("state"));
		}
		if(condition.containsKey("tradeClassifyId")){
			sql += " and t.trade_classify_id = ?";
			queryParams.add(condition.get("tradeClassifyId"));
		}
		if(condition.containsKey("title")){
			sql += " and t.title like ?";
			queryParams.add("%"+condition.get("title")+"%");
		}
		
		return gridService.loadData(condition.getRequest(), sql, queryParams.toArray());
	}

	@Override
	public List<Map<String, Object>> loadAllListWithIndex(Condition condition) {
		String sql = "select t.id, t.title, t.trade_classify_id from t_solution_details t where t.state = " + NewsStateEnum.YES.getState();
		return jdbcAssistant.query(sql, condition.valueArray());
	}
	
}
