package com.insproject.provider.module.index.service;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.insplatform.core.http.Condition;

@Service
public interface IndexService{
	
	/**
	 * 查询首页数据
	 * @return
	 */
	public Map<String, Object> getIndexData(Condition condition);
}
