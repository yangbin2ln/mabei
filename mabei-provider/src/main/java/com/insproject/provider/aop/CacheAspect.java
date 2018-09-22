package com.insproject.provider.aop;

import java.io.Serializable;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Set;

import org.apache.log4j.Logger;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import com.insplatform.core.http.Condition;
import com.insplatform.spring.cache.CacheService;

@Aspect
@Component
public class CacheAspect {
	protected Logger logger = Logger.getLogger(this.getClass());
	
	@Autowired
	private CacheService cacheService;
	
	@Autowired
	private RedisTemplate<String, Object> redisTemplate;
	 
    @Around("execution(@com.insproject.provider.aop.RedisCache * *(..))")
    public Object saveCache(ProceedingJoinPoint pjp) throws Throwable{
        Condition condition = prevCheck(pjp);
        if(condition == null){
        	return pjp.proceed();
        }
        
        Object[] args = pjp.getArgs();
        @SuppressWarnings("rawtypes")
		Class[] clazzs = new Class[args.length];
        for(int i=0;i<args.length;i++){
        	clazzs[i] = args[i].getClass();
        }
        
        String methodName = pjp.getSignature().getName();	
        Method method = pjp.getTarget().getClass().getMethod(methodName, (Class<?>[]) clazzs);
        RedisCache annotation = method.getAnnotation(RedisCache.class);
        String baseRedisKey = annotation.value();
        String key = baseRedisKey + "_" + compareKey(condition);
        
        Object proceed = cacheService.get(key);
        if(proceed == null){
        	proceed = pjp.proceed();
        	try {
        		logger.info("更新缓存开始");
				cacheService.saveOrUpdate(key, proceed);
				logger.info("更新缓存成功");
			} catch (Exception e) {
				logger.error("更新缓存失败", e);
			}
        }
        
        return proceed;
    }
    
    @After("execution(@com.insproject.provider.aop.ClearRedisCache * *(..))")
    public void clearCache(JoinPoint joinPoint) throws Exception{
    	 Object[] args = joinPoint.getArgs();
         @SuppressWarnings("rawtypes")
 		 Class[] clazzs = new Class[args.length];
         for(int i=0;i<args.length;i++){
        	 Object arg = args[i];
        	 if(arg == null){
        		 clazzs[i] = String.class;//此处有bug，暂时这样处理
        	 }else{
        		 if(arg.getClass().isArray() && arg.getClass().getSimpleName().equals("String[]")){
        			 clazzs[i] = String[].class;
        		 }else{
        			 clazzs[i] = arg.getClass();
        		 }
        	 }
         }
    	 String methodName = joinPoint.getSignature().getName();	
         Method method = null;
		try {
			method = joinPoint.getTarget().getClass().getMethod(methodName, (Class<?>[]) clazzs);
		} catch (Exception e1) {
			for(int i=0;i<args.length;i++){
	        	 Object arg = args[i];
	        	 if(arg == null){
	        		 clazzs[i] = String.class;//此处有bug，暂时这样处理
	        	 }else{
	        		 if(arg.getClass().isArray() && arg.getClass().getSimpleName().equals("String[]")){
	        			 clazzs[i] = Serializable[].class;
	        		 }else{
	        			 clazzs[i] = arg.getClass();
	        		 }
	        	 }
	         }
			method = joinPoint.getTarget().getClass().getMethod(methodName, (Class<?>[]) clazzs);
		}
         ClearRedisCache annotation = method.getAnnotation(ClearRedisCache.class);
         String baseKey = annotation.value();
         try {
         Set<String> keys = redisTemplate.keys("*");
         Object[] array = keys.toArray();
         
         List<String> delKeys = new ArrayList<String>();
         for(Object obj: array){
        	 if(obj.toString().matches(baseKey + ".*")){
        		 delKeys.add(obj.toString());
        	 }
         }
         logger.info("删除缓存开始"+Arrays.toString(delKeys.toArray()));
         redisTemplate.delete(delKeys);
         logger.info("删除缓存完成"+Arrays.toString(delKeys.toArray()));
		} catch (Exception e) {
			logger.error("删除缓存失败", e);
		}
         
    }


	/**
	 * 根据查询条件组装key
	 * @param condition
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private String compareKey(Condition condition) {
		Object[] array = condition.keySet().toArray();
		List<Object> list = Arrays.asList(array);
		Collections.sort(list, new Comparator(){

			@Override
			public int compare(Object o1, Object o2) {
				return o1.toString().hashCode() - o2.toString().hashCode();
			}
			
		});
		String key = "";
		for(Object obj:list){
			key += obj.toString() + ":" + condition.get(obj);
		}
		return key;
	}


	/**
	 * 方法验证
	 * @param pjp
	 * @return
	 */
	private Condition prevCheck(ProceedingJoinPoint pjp) {
		//第一个参数必须是Condition
		Object[] args = pjp.getArgs();
		if(args.length == 0 || !(args[0] instanceof Condition)){
			return null;
		}else{
			return (Condition) args[0];
		}
	}
	

}
