package com.insproject.provider.module.news.entity;

import java.io.Serializable;

import com.insplatform.spring.persistence.annotation.Id;
import com.insplatform.spring.persistence.annotation.Table;
import com.insproject.provider.module.constant.NewsStateEnum;


@Table("t_news")
public class News implements Serializable {
	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	
	/***/
	@Id
	private java.lang.Integer id;
	/**标题*/
	private String title;
	/**内容*/
	private String content;
	/**创建时间*/
	private java.util.Date createTime;
	/***/
	private java.lang.Integer createUserId;
	/**更新时间*/
	private java.util.Date updateTime;
	/**发布状态*/
	private String state = NewsStateEnum.NOT.getState();

	public void setId(java.lang.Integer value) {
		this.id = value;
	}
	
	public java.lang.Integer getId() {
		return this.id;
	}
	
	public void setTitle(String value) {
		this.title = value;
	}
	
	public String getTitle() {
		return this.title;
	}
	
	public void setContent(String value) {
		this.content = value;
	}
	
	public String getContent() {
		return this.content;
	}
	
	public void setCreateTime(java.util.Date value) {
		this.createTime = value;
	}
	
	public java.util.Date getCreateTime() {
		return this.createTime;
	}
	
	public void setCreateUserId(java.lang.Integer value) {
		this.createUserId = value;
	}
	
	public java.lang.Integer getCreateUserId() {
		return this.createUserId;
	}
	
	public void setUpdateTime(java.util.Date value) {
		this.updateTime = value;
	}
	
	public java.util.Date getUpdateTime() {
		return this.updateTime;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}
	
}