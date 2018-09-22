package com.insproject.provider.module.successcase.entity;

import java.io.Serializable;

import com.insplatform.spring.persistence.annotation.Id;
import com.insplatform.spring.persistence.annotation.Table;
import com.insproject.provider.module.constant.NewsStateEnum;


@Table("t_success_case")
public class SuccessCase implements Serializable {
	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	
	/***/
	@Id
	private java.lang.Integer id;
	/**标题*/
	private String title;
	/**背景图*/
	private String imgPath;
	/**案例详情*/
	private String content;
	/**创建人*/
	private java.lang.Integer createUserId;
	/**创建时间*/
	private java.util.Date createTime;
	/**更新时间*/
	private java.util.Date updateTime;
	/**行业类别*/
	private Integer tradeClassifyId;
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
	
	public void setImgPath(String value) {
		this.imgPath = value;
	}
	
	public String getImgPath() {
		return this.imgPath;
	}
	
	public void setContent(String value) {
		this.content = value;
	}
	
	public String getContent() {
		return this.content;
	}
	
	public void setCreateUserId(java.lang.Integer value) {
		this.createUserId = value;
	}
	
	public java.lang.Integer getCreateUserId() {
		return this.createUserId;
	}
	
	public void setCreateTime(java.util.Date value) {
		this.createTime = value;
	}
	
	public java.util.Date getCreateTime() {
		return this.createTime;
	}
	
	public void setUpdateTime(java.util.Date value) {
		this.updateTime = value;
	}
	
	public java.util.Date getUpdateTime() {
		return this.updateTime;
	}

	public Integer getTradeClassifyId() {
		return tradeClassifyId;
	}

	public void setTradeClassifyId(Integer tradeClassifyId) {
		this.tradeClassifyId = tradeClassifyId;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}
	
}