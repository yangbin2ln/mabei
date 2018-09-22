package com.insproject.provider.module.successcase.repository.impl;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.insplatform.component.service.ext.grid.GridService;
import com.insplatform.core.http.Condition;
import com.insplatform.core.utils.JsonUtil;
import com.insplatform.spring.baseclass.repository.impl.BaseRepositoryImpl;
import com.insplatform.spring.mapper.ValueMapper;
import com.insproject.provider.aop.ClearRedisCache;
import com.insproject.provider.module.constant.NewsStateEnum;
import com.insproject.provider.module.successcase.entity.SuccessCase;
import com.insproject.provider.module.successcase.repository.SuccessCaseRepository;


@Repository("SuccessCaseRepositoryImpl")
public class SuccessCaseRepositoryImpl extends BaseRepositoryImpl<SuccessCase> implements SuccessCaseRepository{
	
	@Autowired
	private GridService gridService;
	
	@Override
	public List<Map<String, Object>> loadAllList(Condition condition) {	
		String sql = "select t.* from t_success_case t ";
		return jdbcAssistant.query(sql, condition.valueArray());
	}
	
	@Override
	public Map<String, Object> load(String id) {	
		String sql = "select t.*, tc.name trade_classify_name from t_success_case t left join t_trade_classify tc on(tc.id = t.trade_classify_id) where t.id = ? ";
		return jdbcAssistant.queryOne(sql, new Object[]{id},new ValueMapper(){

			@Override
			public RETURN_CODE map(Map<String, Object> record) throws Exception {
				if(record.get("imgPath") != null && !record.get("imgPath").toString().equals("")){
					List<String> imgPath = new ArrayList<String>();
					imgPath.add(record.get("imgPath").toString());
					record.put("imgPath", JsonUtil.toJson(imgPath));
				}
				if(record.get("iconPath") != null && !record.get("iconPath").toString().equals("")){
					List<String> iconPath = new ArrayList<String>();
					iconPath.add(record.get("iconPath").toString());
					record.put("iconPath", JsonUtil.toJson(iconPath));
				}
				return RETURN_CODE.NEXT;
			}
			
		});
	}
	
	/**
	 * 重写父类get方法
	 */
	@Override
	public SuccessCase get(Serializable id) {		
		return super.get(id);
	}
	
	/**
	 * 重写父类save方法
	 */
	@Override
	@ClearRedisCache("indexData")
	public Serializable save(SuccessCase entity) {	
		return super.save(entity);
	}
	
	/**
	 * 重写父类update方法
	 */
	@Override
	@ClearRedisCache("indexData")
	public int update(SuccessCase entity) {		
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
				   + " from t_success_case t "
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
		String sql = "select t.id, t.title, t.img_path, t.trade_classify_id from t_success_case t where t.state = " + NewsStateEnum.YES.getState();
		return jdbcAssistant.query(sql, condition.valueArray());
	}
	
}
