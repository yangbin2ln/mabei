package com.insproject.provider.module.tradeclassify.entity;

import java.io.Serializable;

import com.insplatform.spring.persistence.annotation.Id;
import com.insplatform.spring.persistence.annotation.Table;


@Table("t_trade_classify")
public class TradeClassify implements Serializable {
	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	
	/***/
	@Id
	private java.lang.Integer id;
	/**行业名称*/
	private String name;
	/**行业背景图片*/
	private String imgPath;
	/**行业图标图片*/
	private String iconPath;
	/**创建人*/
	private java.lang.Integer createUserId;
	/**创建时间*/
	private java.util.Date createTime;
	/**更新时间*/
	private java.util.Date updateTime;
	/**排序号*/
	private Integer orderIndex;
	public void setId(java.lang.Integer value) {
		this.id = value;
	}
	
	public java.lang.Integer getId() {
		return this.id;
	}
	
	public void setName(String value) {
		this.name = value;
	}
	
	public String getName() {
		return this.name;
	}
	
	public void setImgPath(String value) {
		this.imgPath = value;
	}
	
	public String getImgPath() {
		return this.imgPath;
	}
	
	public void setIconPath(String value) {
		this.iconPath = value;
	}
	
	public String getIconPath() {
		return this.iconPath;
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

	public Integer getOrderIndex() {
		return orderIndex;
	}

	public void setOrderIndex(Integer orderIndex) {
		this.orderIndex = orderIndex;
	}
	
}