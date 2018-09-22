package com.insproject.provider.module.news.repository.impl;

import java.io.Serializable;
import java.util.*;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.insplatform.spring.baseclass.repository.impl.BaseRepositoryImpl;
import com.insplatform.spring.mapper.ValueMapper;
import com.insproject.provider.module.news.repository.NewsRepository;
import com.insproject.provider.aop.ClearRedisCache;
import com.insproject.provider.module.constant.NewsStateEnum;
import com.insproject.provider.module.news.entity.News;

import com.insplatform.component.service.ext.grid.GridService;
import com.insplatform.core.http.Condition;


@Repository("NewsRepositoryImpl")
public class NewsRepositoryImpl extends BaseRepositoryImpl<News> implements NewsRepository{
	
	@Autowired
	private GridService gridService;
	
	@Override
	public List<Map<String, Object>> loadAllList(Condition condition) {	
		String sql = "select t.*, u.name create_user_name from t_news t left join sys_user u on(u.id = t.create_user_id) ";
		return jdbcAssistant.query(sql, condition.valueArray());
	}
	
	@Override
	public Map<String, Object> load(String id) {	
		String sql = "select t.* from t_news t where t.id = ? ";
		return jdbcAssistant.queryOne(sql, new Object[]{id});
	}
	
	/**
	 * 重写父类get方法
	 */
	@Override
	public News get(Serializable id) {		
		return super.get(id);
	}
	
	/**
	 * 重写父类save方法
	 */
	@Override
	@ClearRedisCache("indexData")
	public Serializable save(News entity) {	
		return super.save(entity);
	}
	
	/**
	 * 重写父类update方法
	 */
	@Override
	@ClearRedisCache("indexData")
	public int update(News entity) {		
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
		String sql = "select t.*, u.name create_user_name from t_news t left join sys_user u on(u.id = t.create_user_id) where 1=1";
		
		if(condition.containsKey("state")){
			sql += " and t.state = ?";
			queryParams.add(condition.get("state"));
		}

		if(condition.containsKey("title")){
			sql += " and t.title like ?";
			queryParams.add("%" + condition.get("title") + "%");
		}
		
		return gridService.loadData(condition.getRequest(), sql, queryParams.toArray());
	}

	@Override
	public List<Map<String, Object>> loadAllListWithIndex(Condition condition) {
		String sql = "select t.id, t.title, t.content, date_format(t.create_time,'%m') month, date_format(t.create_time,'%m') day"
				   + " from t_news t where t.state = " + NewsStateEnum.YES.getState() + " order by t.create_time desc limit 0,6";
		return jdbcAssistant.query(sql, condition.valueArray(), new ValueMapper(){

			@Override
			public RETURN_CODE map(Map<String, Object> record) throws Exception {
				String content = record.get("content") == null ? "": record.get("content").toString();
				if(content != null){
					content = content.toString().replaceAll("<(.*?)>", "").replaceAll("&nbsp;", "");
					if(content.length() > 55){
						content = content.substring(0, 55);
						content += "...";
					}
					record.put("content", content);
				}
				record.put("month", MonthMap.get(record.get("month").toString()));
				return RETURN_CODE.NEXT;
			}
			
		});
	}
	
	static Map<String,String> MonthMap = new HashMap<String,String>();
	static{
		MonthMap.put("01", "JAN");
		MonthMap.put("02", "FEB");
		MonthMap.put("03", "MAR");
		MonthMap.put("04", "JAN");
		MonthMap.put("05", "APR");
		MonthMap.put("06", "JUNE");
		MonthMap.put("07", "JULY");
		MonthMap.put("08", "AUG");
		MonthMap.put("09", "SEPT");
		MonthMap.put("10", "OCT");
		MonthMap.put("11", "NOV");
		MonthMap.put("12", "DEC");
	}
	 
}
