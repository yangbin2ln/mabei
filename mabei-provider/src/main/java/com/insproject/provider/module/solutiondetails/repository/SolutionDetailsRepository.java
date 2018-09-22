package com.insproject.provider.module.solutiondetails.repository;

import java.util.*;

import com.insplatform.spring.baseclass.repository.BaseRepository;
import com.insproject.provider.module.solutiondetails.entity.SolutionDetails;

import com.insplatform.core.http.Condition;


public interface SolutionDetailsRepository extends BaseRepository<SolutionDetails>{
	
	
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
