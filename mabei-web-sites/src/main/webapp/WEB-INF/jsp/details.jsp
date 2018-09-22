<%@ page language="java" contentType="text/html; charset=utf-8"%>
<!DOCTYPE html>
<html lang="zh-CN">

<head>
	<%@ include file="/common/common-include.jsp"%>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="Description" content="西软是中石油、中石化等中国世界500强企业信息化服务提供商，为您提供满足独特需求的软件和系统服务。西软基于自主版权产品的行业解决方案，成功应用于石油工程服务行业、煤炭矿山、教育信息化、制造行业、知识型项目型组织、现代服务业，帮助企业构建运营资源综合信息管理平台，提升执行力与决策科学性。">
    <meta name="Keywords" content="西软,西软股份,教育信息化,信息化服务,管理软件,行业解决方案,石油行业软件,煤炭矿山行业软件">
    <title>西软-${headTitle}-${title}</title>
    <!-- Bootstrap -->
    <link href="${CURRENT_STATIC_PATH}/lib/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="${CURRENT_STATIC_PATH}/css/reset.css">
    <link rel="stylesheet" href="${CURRENT_STATIC_PATH}/css/navBar.css">
    <link rel="stylesheet" href="${CURRENT_STATIC_PATH}/css/footer.css">
    <link rel="stylesheet" href="${CURRENT_STATIC_PATH}/css/main.css">
    <!--[if lt IE 9]>
      <script src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body style="background-color: #f5f5f5">
    <!-- HEADER -->
    <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <a href="${CTX_PATH}" class="navbar-brand navbar-logo">
                    <img src="${CURRENT_STATIC_PATH}/images/logo.jpg" alt="西软">
                </a>
            </div>
            <!-- MAIN NAVIGATION -->
            <div class="navbar-collapse collapse navbar-mega-menu" id="myNavbar">
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a href="${CTX_PATH}#news">新闻动态</a>
                    </li>
                    <li>
                        <a href="${CTX_PATH}#porject">解决方案</a>
                    </li>
                    <li>
                        <a href="${CTX_PATH}#cases">成功案例</a>
                    </li>
                    <li>
                        <a href="${CTX_PATH}#indc">西软简介</a>
                    </li>
                    <li>
                        <a href="${CTX_PATH}#honor">荣誉资质</a>
                    </li>
                    <li>
                        <a href="${CTX_PATH}#partner">服务合作</a>
                    </li>
                    <li>
                        <a href="${CTX_PATH}#contact">联系我们</a>
                    </li>
                </ul>
            </div>
            <!-- END MAIN NAVIGATION -->
        </div>
    </nav>
    <div class="Detail-page">
        <div class="main-detail-bg"></div>
    
        <div class="container">
            <ol class="breadcrumb">
                <li>
                    <a href="#">您当前的位置：</a>
                </li>
                <li>
                    <a href="${CTX_PATH}">首页</a>
                </li>
                <li>
                    <a href="${CTX_PATH}${preUrl}">${preTitle}</a>
                </li>
                <li class="active">${title }</li>
            </ol>
            <div class="detail-page-content">
                <h1 class="art-title-bar">${title }</h1>
                <div style='padding:10px 0px;'>
                	${content }
                </div>
            </div>
        </div>        
    </div>
    <!-- FOOTER -->
    <div class="ws-footer">
        <div class="footer-nav">
            <div class="container">
                <div class="row">
                    <div class="col-xs-10">
                    </div>
                    <div class="col-xs-2" style="text-align: right">
                        <div class="goTop" id="goTop">
                            返回顶部
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="contat-way">
            <div class="container">
                <div class="row">
                    <div class="col-xs-6">
                        <p class="ws-name">西软软件股份有限公司西安总公司</p>
                        <ul class="contact-way-ul">
                            <li>地址：西安市太白南路181号西部电子社区A-A-4</li>
                            <li>邮编：710065</li>
                            <li>电话：400-666-1206</li>
                            <li>传真：029-88234941</li>
                            <li>网址：www.westerasoft.com</li>
                        </ul>
                        <p class="aq">陕ICP备13007676号-6</p>
                    </div>
                    <div class="col-xs-6" style="text-align: right">
                        <div class="tel">
                            <strong>400-666-1206</strong>
                            <p>周一至周五（9：00-18：00）</p>
                            <button class="contact-btn">
                                <i class="glyphicon glyphicon-earphone"></i> 在线客服</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="${CURRENT_STATIC_PATH}/lib/bootstrap/js/bootstrap.min.js"></script>
    <script src="${CURRENT_STATIC_PATH}/lib/flexslider/jquery.flexslider-min.js"></script>
</body>

</html>