package com.insproject.provider.module.tradeclassify.repository;

import java.util.*;

import com.insplatform.spring.baseclass.repository.BaseRepository;
import com.insproject.provider.module.tradeclassify.entity.TradeClassify;

import com.insplatform.core.http.Condition;


public interface TradeClassifyRepository extends BaseRepository<TradeClassify>{
	
	
	/**
	 * 加载数据
	 * @param request
	 * @param response
	 * @return
	 */
	List<Map<String, Object>> loadAllList(Condition condition);

	List<Map<String, Object>> loadAllListWithIndex(Condition condition);
	
	/**
	 * 加载单条数据
	 * @param request
	 * @param response
	 * @return
	 */
	Map<String, Object> load(String id);
	
	Map<String, Object> loadAllGrid(Condition condition);
	
}
