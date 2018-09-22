package com.insproject.provider.module.successcase.service.impl;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.insplatform.component.service.file.bean.FileBean;
import com.insplatform.core.http.Condition;
import com.insplatform.core.utils.JsonUtil;
import com.insplatform.core.utils.TextUtil;
import com.insplatform.spring.baseclass.repository.BaseRepository;
import com.insplatform.spring.baseclass.service.impl.BaseServiceImpl;
import com.insproject.common.component.FileService;
import com.insproject.provider.aop.ClearRedisCache;
import com.insproject.provider.module.successcase.entity.SuccessCase;
import com.insproject.provider.module.successcase.repository.SuccessCaseRepository;
import com.insproject.provider.module.successcase.service.SuccessCaseService;

@Service("SuccessCaseServiceImpl")
public class SuccessCaseServiceImpl extends BaseServiceImpl<SuccessCase> implements SuccessCaseService{
	
	@Autowired
	@Qualifier("SuccessCaseRepositoryImpl")
	private SuccessCaseRepository successCaseRepository;

	@Autowired
	private FileService fileService;

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Override
	public BaseRepository<SuccessCase> getRepository() {		
		return successCaseRepository;
	}
	
	@Override
	public List<Map<String, Object>> loadAllList(Condition condition) {			
		return successCaseRepository.loadAllList(condition);
	}
	
	@Override
	public Map<String, Object> load(String id) {			
		return successCaseRepository.load(id);
	}
	
	/**
	 * 重写父类get方法
	 */
	@Override
	public SuccessCase get(Serializable id) {		
		return successCaseRepository.get(id);
	}
	
	/**
	 * 重写父类save方法
	 */
	@Override
	public Serializable save(SuccessCase entity) {	
		String imgPath = entity.getImgPath();
		
		if(TextUtil.isNotEmpty(imgPath)){
			List list = JsonUtil.toObject(imgPath, List.class);
			imgPath = (String) list.get(0);
			FileBean fileBean = fileService.copyFileToModule(imgPath, "successCase");
			entity.setImgPath(fileBean.getUrlPath());
		}
		
		return successCaseRepository.save(entity);
	}
	
	/**
	 * 重写父类update方法
	 */
	@Override
	public int update(SuccessCase entity) {		
		String imgPath = entity.getImgPath();
		
		if(TextUtil.isNotEmpty(imgPath)){
			List list = JsonUtil.toObject(imgPath, List.class);
			imgPath = (String) list.get(0);
			FileBean fileBean = fileService.copyFileToModule(imgPath, "successCase");
			entity.setImgPath(fileBean.getUrlPath());
		}
		return successCaseRepository.update(entity);
	}
	
	/**
	 * 重写父类deleteById方法
	 */
	@Override
	public int deleteById(Serializable id) {		
		return successCaseRepository.deleteById(id);
	}
	
	/**
	 * 重写父类deleteByIds方法
	 */
	@Override
	public int[] deleteByIds(Serializable[] ids) {		
		return successCaseRepository.deleteByIds(ids);
	}
	
	@Override
	public  Map<String, Object> loadAllGrid(Condition condition) {
		return successCaseRepository.loadAllGrid(condition);
	}
	
	@Override
	@ClearRedisCache("indexData")
	public int[] updateState(String[] ids, String state) {
		String sql = "update t_success_case set state = ? where id = ?";
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
