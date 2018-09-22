package com.insproject.provider.module.solutiondetails.service.impl;

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
import com.insproject.provider.module.solutiondetails.entity.SolutionDetails;
import com.insproject.provider.module.solutiondetails.repository.SolutionDetailsRepository;
import com.insproject.provider.module.solutiondetails.service.SolutionDetailsService;

@Service("SolutionDetailsServiceImpl")
public class SolutionDetailsServiceImpl extends BaseServiceImpl<SolutionDetails> implements SolutionDetailsService{
	
	@Autowired
	@Qualifier("SolutionDetailsRepositoryImpl")
	private SolutionDetailsRepository solutionDetailsRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Override
	public BaseRepository<SolutionDetails> getRepository() {		
		return solutionDetailsRepository;
	}
	
	@Override
	public List<Map<String, Object>> loadAllList(Condition condition) {			
		return solutionDetailsRepository.loadAllList(condition);
	}
	
	@Override
	public Map<String, Object> load(String id) {			
		return solutionDetailsRepository.load(id);
	}
	
	/**
	 * 重写父类get方法
	 */
	@Override
	public SolutionDetails get(Serializable id) {		
		return solutionDetailsRepository.get(id);
	}
	
	/**
	 * 重写父类save方法
	 */
	@Override
	public Serializable save(SolutionDetails entity) {	
		return solutionDetailsRepository.save(entity);
	}
	
	/**
	 * 重写父类update方法
	 */
	@Override
	public int update(SolutionDetails entity) {		
		return solutionDetailsRepository.update(entity);
	}
	
	/**
	 * 重写父类deleteById方法
	 */
	@Override
	public int deleteById(Serializable id) {		
		return solutionDetailsRepository.deleteById(id);
	}
	
	/**
	 * 重写父类deleteByIds方法
	 */
	@Override
	public int[] deleteByIds(Serializable[] ids) {		
		return solutionDetailsRepository.deleteByIds(ids);
	}
	
	@Override
	public  Map<String, Object> loadAllGrid(Condition condition) {
		return solutionDetailsRepository.loadAllGrid(condition);
	}

	@Override
	@ClearRedisCache("indexData")
	public int[] updateState(String[] ids, String state) {
		String sql = "update t_solution_details set state = ? where id = ?";
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
