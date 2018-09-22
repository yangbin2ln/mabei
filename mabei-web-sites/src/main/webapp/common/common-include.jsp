<%@page import="com.insplatform.core.utils.*"%>
<%@page import="java.util.Locale"%>
<%@page import="org.springframework.web.servlet.i18n.CookieLocaleResolver"%>
<%@page language="java" contentType="text/html; charset=utf-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%
//上下文路径
String CTX_PATH = request.getContextPath();
pageContext.setAttribute("CTX_PATH", CTX_PATH);

//完整上下文路径
String BASE_CTX_PATH = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+CTX_PATH+"/";
pageContext.setAttribute("BASE_CTX_PATH", BASE_CTX_PATH);

//静态资源路径
Object STATIC_PATH = request.getServletContext().getAttribute("STATIC_PATH");
pageContext.setAttribute("STATIC_PATH", STATIC_PATH);	

//当前静态资源路径
pageContext.setAttribute("CURRENT_STATIC_PATH", STATIC_PATH.toString() + "/web-sites");	

//文件服务器路径
Object FILE_PATH = request.getServletContext().getAttribute("FILE_PATH");
pageContext.setAttribute("FILE_PATH", FILE_PATH);

//国际化
Object LOCALE = CookieUtil.readCokie(request, CookieLocaleResolver.LOCALE_REQUEST_ATTRIBUTE_NAME);
if(LOCALE == null || "".equals(LOCALE)){
	LOCALE = Locale.CHINA;
}
pageContext.setAttribute("LOCALE", LOCALE);

//静态资源版本号，防止浏览器缓存，正式发布后每次修改静态资源请修改该版本号
pageContext.setAttribute("STATIC_VERSION", "west2016");

%>
<script type="text/javascript">
var IS_DEV_MODEL = '${IS_DEV_MODEL}',
	CTX_PATH = '${CTX_PATH}',
	STATIC_PATH = '${STATIC_PATH}',
	CURRENT_STATIC_PATH = '${CURRENT_STATIC_PATH}',
	FILE_PATH = '${FILE_PATH}',	
	LOCALE='${LOCALE}',
	STATIC_VERSION = (IS_DEV_MODEL == 'Y') ? '<%=System.nanoTime()%>' : '${STATIC_VERSION}';
	
var CURRENT_USER = {
		id: '${sessionScope.CURRENT_USER.id}',
		name: '${sessionScope.CURRENT_USER.name}',
		account: '${sessionScope.CURRENT_USER.account}'
};	
</script>
