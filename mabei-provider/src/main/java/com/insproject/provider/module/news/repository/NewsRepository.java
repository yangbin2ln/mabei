package com.insproject.provider.module.news.repository;

import java.util.*;

import com.insplatform.spring.baseclass.repository.BaseRepository;
import com.insproject.provider.module.news.entity.News;

import com.insplatform.core.http.Condition;


public interface NewsRepository extends BaseRepository<News>{
	
	
	/**
	 * 加载数据
	 * @param request
	 * @param response
	 * @return
	 */
	List<Map<String, Object>> loadAllList(Condition condition);
	
	/**
	 * 加载单条数据
	 * @param request
	 * @param response
	 * @return
	 */
	Map<String, Object> load(String id);
	
	Map<String, Object> loadAllGrid(Condition condition);
	
	List<Map<String, Object>> loadAllListWithIndex(Condition condition);
}
