<%@ page language="java" contentType="text/html; charset=utf-8"%>
<a id="news"></a>
    <div class="ws-news">
        <!-- title -->
        <div class="line-title">
            <h1 class="txt-ch">新闻动态</h1>
            <p class="txt-en">NEWS</p>
            <span class="blue-short-line"></span>
        </div>
        <div class="container">
            <div class="row home-news-row">
                <div class="col col-xs-6">
                    <ul class="home-news">
                    <c:forEach var="news" items="${data.newsList}" varStatus="status"> 
                    	<c:if test="${status.index%2==0}">
	                    	<li class="home-news-list clearfix">
	                             <a target="_blank" href="${CTX_PATH}/news/${news.id}.html">
	                                <div class="date fl">
	                                    <span class="moth">${news.month }</span>
	                                    <span class="day">${news.day }</span>
	                                </div>
	                                <div class="txt fl">
	                                    <h1>${news.title }</h1>
	                                    <p class="from">【西软软件】</p>
	                                    <p class="detail">${news.content}</p>
	                                </div>
	                                <div class="icon fl">
	                                    <span>+</span>
	                                </div>
	                            </a>
	                        </li>
                    	</c:if>
                    </c:forEach>
                    </ul>
                </div>
                <div class="col col-xs-6">
                    <ul class="home-news">
                      <c:forEach var="news" items="${data.newsList}" varStatus="status"> 
                    	<c:if test="${status.index%2==1}">
	                    	<li class="home-news-list clearfix">
	                            <a target="_blank" href="${CTX_PATH}/news/${news.id}.html">
	                                <div class="date fl">
	                                    <span class="moth">${news.month }</span>
	                                    <span class="day">${news.day }</span>
	                                </div>
	                                <div class="txt fl">
	                                    <h1>${news.title }</h1>
	                                    <p class="from">【西软软件】</p>
	                                    <p class="detail">${news.content}</p>
	                                </div>
	                                <div class="icon fl">
	                                    <span>+</span>
	                                </div>
	                            </a>
	                        </li>
                    	</c:if>
                    </c:forEach>
                    </ul>
                </div>
            </div>
        </div>
    </div>