package com.insproject.provider.module.index.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.insplatform.core.Pager;
import com.insplatform.core.http.Condition;
import com.insplatform.spring.jdbc.JdbcAssistant;
import com.insproject.provider.aop.RedisCache;
import com.insproject.provider.module.index.service.IndexService;
import com.insproject.provider.module.news.repository.NewsRepository;
import com.insproject.provider.module.solutiondetails.repository.SolutionDetailsRepository;
import com.insproject.provider.module.successcase.repository.SuccessCaseRepository;
import com.insproject.provider.module.tradeclassify.repository.TradeClassifyRepository;

@Service
public class IndexServiceImpl implements IndexService{
	
	@Autowired
	private JdbcAssistant jdbcAssistant;

	@Autowired
	private TradeClassifyRepository tradeClassifyRepository;

	@Autowired
	private SolutionDetailsRepository solutionDetailsRepository;

	@Autowired
	private SuccessCaseRepository successCaseRepository;

	@Autowired
	private NewsRepository newsRepository;

	@Override
	@RedisCache("indexData")
	public Map<String, Object> getIndexData(Condition condition) {
		Map<String,Object> result = new HashMap<String,Object>();
		
		//查询新闻前6条
		List<Map<String, Object>> newsList = newsRepository.loadAllListWithIndex(condition);
		result.put("newsList", newsList);
		
		//查询行业类别
		List<Map<String, Object>> tradeList = tradeClassifyRepository.loadAllListWithIndex(condition);
		result.put("tradeList", tradeList);
		
		//解决方案
		List<Map<String, Object>> solutionDetailsList = solutionDetailsRepository.loadAllListWithIndex(condition);
		Map<Integer,List<Map<String,Object>>> solutionDetailsData = new HashMap<Integer,List<Map<String,Object>>>();
		Integer id;
		for(Map<String,Object> m: solutionDetailsList){
			id = Integer.parseInt(m.get("tradeClassifyId").toString());
			if(!solutionDetailsData.containsKey(id)){
				solutionDetailsData.put(id, new ArrayList<Map<String, Object>>());
			}
			solutionDetailsData.get(id).add(m);
		}
		result.put("solutionDetailsData", solutionDetailsData);
		
		
		//成功案例
		List<Map<String, Object>> successCaseList = successCaseRepository.loadAllListWithIndex(condition);
		Map<Integer,List<Map<String,Object>>> successCaseData = new HashMap<Integer,List<Map<String,Object>>>();
		for(Map<String,Object> m: successCaseList){
			id = Integer.parseInt(m.get("tradeClassifyId").toString());
			if(!successCaseData.containsKey(id)){
				successCaseData.put(id, new ArrayList<Map<String, Object>>());
			}
			successCaseData.get(id).add(m);
		}
		result.put("successCaseData", successCaseData);
		
		
		return result;
	}


}
