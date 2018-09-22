package com.insproject.provider.module.tradeclassify.service.impl;

import java.io.Serializable;
import java.util.*;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.insplatform.spring.baseclass.repository.BaseRepository;
import com.insplatform.spring.baseclass.service.impl.BaseServiceImpl;
import com.insplatform.component.service.file.bean.FileBean;
import com.insplatform.core.http.Condition;
import com.insplatform.core.utils.JsonUtil;
import com.insplatform.core.utils.TextUtil;
import com.insproject.common.component.FileService;
import com.insproject.provider.module.tradeclassify.entity.TradeClassify;
import com.insproject.provider.module.tradeclassify.repository.TradeClassifyRepository;
import com.insproject.provider.module.tradeclassify.service.TradeClassifyService;

@Service("TradeClassifyServiceImpl")
public class TradeClassifyServiceImpl extends BaseServiceImpl<TradeClassify> implements TradeClassifyService{
	
	@Autowired
	@Qualifier("TradeClassifyRepositoryImpl")
	private TradeClassifyRepository tradeClassifyRepository;
	
	@Autowired
	private FileService fileService;

	@Override
	public BaseRepository<TradeClassify> getRepository() {		
		return tradeClassifyRepository;
	}
	
	@Override
	public List<Map<String, Object>> loadAllList(Condition condition) {			
		return tradeClassifyRepository.loadAllList(condition);
	}
	
	@Override
	public Map<String, Object> load(String id) {			
		return tradeClassifyRepository.load(id);
	}
	
	/**
	 * 重写父类get方法
	 */
	@Override
	public TradeClassify get(Serializable id) {		
		return tradeClassifyRepository.get(id);
	}
	
	/**
	 * 重写父类save方法
	 */
	@Override
	public Serializable save(TradeClassify entity) {	
		String iconPath = entity.getIconPath();
		String imgPath = entity.getImgPath();
		if(TextUtil.isNotEmpty(iconPath)){
			List list = JsonUtil.toObject(iconPath, List.class);
			iconPath = (String) list.get(0);
			FileBean fileBean = fileService.copyFileToModule(iconPath, "tradeClassifyIcon");
			entity.setIconPath(fileBean.getUrlPath());
		}
		if(TextUtil.isNotEmpty(imgPath)){
			List list = JsonUtil.toObject(imgPath, List.class);
			imgPath = (String) list.get(0);
			FileBean fileBean = fileService.copyFileToModule(imgPath, "tradeClassifyBack");
			entity.setImgPath(fileBean.getUrlPath());
		}
		return tradeClassifyRepository.save(entity);
	}
	
	/**
	 * 重写父类update方法
	 */
	@Override
	public int update(TradeClassify entity) {		
		String iconPath = entity.getIconPath();
		String imgPath = entity.getImgPath();
		if(TextUtil.isNotEmpty(iconPath)){
			List list = JsonUtil.toObject(iconPath, List.class);
			iconPath = (String) list.get(0);
			FileBean fileBean = fileService.copyFileToModule(iconPath, "tradeClassifyIcon");
			entity.setIconPath(fileBean.getUrlPath());
		}
		if(TextUtil.isNotEmpty(imgPath)){
			List list = JsonUtil.toObject(imgPath, List.class);
			imgPath = (String) list.get(0);
			FileBean fileBean = fileService.copyFileToModule(imgPath, "tradeClassifyBack");
			entity.setImgPath(fileBean.getUrlPath());
		}
		return tradeClassifyRepository.update(entity);
	}
	
	/**
	 * 重写父类deleteById方法
	 */
	@Override
	public int deleteById(Serializable id) {		
		return tradeClassifyRepository.deleteById(id);
	}
	
	/**
	 * 重写父类deleteByIds方法
	 */
	@Override
	public int[] deleteByIds(Serializable[] ids) {		
		return tradeClassifyRepository.deleteByIds(ids);
	}
	
	@Override
	public  Map<String, Object> loadAllGrid(Condition condition) {
		return tradeClassifyRepository.loadAllGrid(condition);
	}


}
