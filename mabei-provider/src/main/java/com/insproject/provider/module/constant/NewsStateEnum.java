package com.insproject.provider.module.constant;

/**
 * 新闻发布状态
 * 
 * @author yangbin
 *
 */
public enum NewsStateEnum {

	/**
	 * 未发布
	 */
	NOT("0"),
	/**
	 * 已发布
	 */
	YES("1");

	private String state;

	NewsStateEnum(String state) {
		this.state = state;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

}
