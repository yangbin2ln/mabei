package com.insproject.provider.module.news.service.impl;

import java.io.Serializable;
import java.util.*;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.insplatform.spring.baseclass.repository.BaseRepository;
import com.insplatform.spring.baseclass.service.impl.BaseServiceImpl;
import com.insplatform.core.http.Condition;
import com.insproject.provider.aop.ClearRedisCache;
import com.insproject.provider.module.news.entity.News;
import com.insproject.provider.module.news.repository.NewsRepository;
import com.insproject.provider.module.news.service.NewsService;

@Service("NewsServiceImpl")
public class NewsServiceImpl extends BaseServiceImpl<News> implements NewsService{
	
	@Autowired
	@Qualifier("NewsRepositoryImpl")
	private NewsRepository newsRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Override
	public BaseRepository<News> getRepository() {		
		return newsRepository;
	}
	
	@Override
	public List<Map<String, Object>> loadAllList(Condition condition) {			
		return newsRepository.loadAllList(condition);
	}
	
	@Override
	public Map<String, Object> load(String id) {			
		return newsRepository.load(id);
	}
	
	/**
	 * 重写父类get方法
	 */
	@Override
	public News get(Serializable id) {		
		return newsRepository.get(id);
	}
	
	/**
	 * 重写父类save方法
	 */
	@Override
	public Serializable save(News entity) {	
		return newsRepository.save(entity);
	}
	
	/**
	 * 重写父类update方法
	 */
	@Override
	public int update(News entity) {		
		return newsRepository.update(entity);
	}
	
	/**
	 * 重写父类deleteById方法
	 */
	@Override
	public int deleteById(Serializable id) {		
		return newsRepository.deleteById(id);
	}
	
	/**
	 * 重写父类deleteByIds方法
	 */
	@Override
	public int[] deleteByIds(Serializable[] ids) {		
		return newsRepository.deleteByIds(ids);
	}
	
	@Override
	public  Map<String, Object> loadAllGrid(Condition condition) {
		return newsRepository.loadAllGrid(condition);
	}

	@Override
	@ClearRedisCache("indexData")
	public int[] updateState(String[] ids, String state) {
		String sql = "update t_news set state = ? where id = ?";
		List<Object[]> argsList = new ArrayList<Object[]>();
		for(String id: ids){
			Object[] args = new Object[2];
			args[0] = state;
			args[1] = id;
			argsList.add(args);
		}
		return jdbcTemplate.batchUpdate(sql, argsList);
		
	}


}
