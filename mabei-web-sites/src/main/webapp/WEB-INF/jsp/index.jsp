<%@ page language="java" contentType="text/html; charset=utf-8"%>
<!DOCTYPE html>
<html lang="zh-CN">

<head>
	<%@ include file="/common/common-include.jsp"%>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="Description" content="西软是中石油、中石化等中国世界500强企业信息化服务提供商，为您提供满足独特需求的软件和系统服务。西软基于自主版权产品的行业解决方案，成功应用于石油工程服务行业、煤炭矿山、教育信息化、制造行业、知识型项目型组织、现代服务业，帮助企业构建运营资源综合信息管理平台，提升执行力与决策科学性。">
    <meta name="Keywords" content="西软,西软股份,教育信息化,信息化服务,管理软件,行业解决方案,石油行业软件,煤炭矿山行业软件">
    <title>西软-中国世界500强企业信息化合作伙伴-值得信赖的管理软件专家</title>
    <!-- Bootstrap -->
    <link href="${CURRENT_STATIC_PATH}/lib/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="${CURRENT_STATIC_PATH}/css/reset.css">
    <link rel="stylesheet" href="${CURRENT_STATIC_PATH}/css/navBar.css">
    <link rel="stylesheet" href="${CURRENT_STATIC_PATH}/css/footer.css">
    <link rel="stylesheet" href="${CURRENT_STATIC_PATH}/lib/viewer/viewer.css">
    <link rel="stylesheet" href="${CURRENT_STATIC_PATH}/css/main.css">
    <!--[if lt IE 9]>
      <script src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    <style>
        body {
            position: relative; 
        }
    </style>
</head>

<body data-spy="scroll" data-target=".navbar" data-offset="50">
    <nav class="navbar navbar-default navbar-fixed-top">
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
                        <a href="#news">新闻动态</a>
                    </li>
                    <li>
                        <a href="#porject">解决方案</a>
                    </li>
                    <li>
                        <a href="#cases">成功案例</a>
                    </li>
                    <li>
                        <a href="#indc">西软简介</a>
                    </li>
                    <li>
                        <a href="#honor">荣誉资质</a>
                    </li>
                    <li>
                        <a href="#partner">服务合作</a>
                    </li>
                    <li>
                        <a href="#contact">联系我们</a>
                    </li>
                </ul>
            </div>
            <!-- END MAIN NAVIGATION -->
        </div>
    </nav>

    <!-- Banner -->
    <div class="flexslider home-flexslider" id="home-flexslider">
        <ul class="slides home-slides">
            <li style="background:url(${CURRENT_STATIC_PATH}/images/index/banner1.png) 50% 0 no-repeat;"><a href="javascript:;"></a></li>
            <li style="background:url(${CURRENT_STATIC_PATH}/images/index/banner2.png) 50% 0 no-repeat;"><a href="javascript:;"></a></li>
            <li style="background:url(${CURRENT_STATIC_PATH}/images/index/banner3.jpg) 50% 0 no-repeat;"><a href="javascript:;"></a></li>
        </ul>
    </div><!-- Banner end -->

    <!-- our culture -->
    <div class="aim">
        <div class="container">
            <div class="row aim-wrap">
                <div class="col-xs-2 wrap-l">走进我们的产品<br/>技术和文化</div>
                <div class="col-xs-10 wrap-r">
                    <div class="col-xs-4 aim-item">
                        <img class="inslyzimg" data-original="${CURRENT_STATIC_PATH}/images/index/aim-sy.png" alt="">
                        <p>我们的夙愿</p>
                        <div class="slide-wrap">
                            <p>成为最可信赖的管理软件及服务供应商</p>
                        </div>
                    </div>
                    <div class="col-xs-4 aim-item">
                        <img class="inslyzimg" data-original="${CURRENT_STATIC_PATH}/images/index/aim-zz.png" alt="">
                        <p>我们的宗旨</p>
                        <div class="slide-wrap">
                            <p>创造客户、公司及个人价值</p>
                        </div>
                    </div>
                    <div class="col-xs-4 aim-item">
                        <img class="inslyzimg" data-original="${CURRENT_STATIC_PATH}/images/index/aim-sm.png" alt="">
                        <p>我们的使命</p>
                        <div class="slide-wrap">
                            <p style="margin-top: 25px">创造性地融合前沿管理科学、先进的信息技术和用户的个性要求、为客户提供先进适用的管理软件及服务</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div><!-- our culture end -->

    <!-- glide down -->
    <div class="glide-down">
        <div class="glide-btn" id="goDown">
            <div class="iner">
                <i class="glyphicon glyphicon-menu-down"></i>
            </div>
        </div>
    </div>

    <!-- business -->
    <div class="ws-business">
        <!-- title -->
        <div class="line-title noline">
            <h1 class="txt-ch">我们的业务优势</h1>
            <p class="txt-en">BUSINESS</p>
            <span class="blue-short-line"></span>
        </div>
        
        <div class="container">
            <h3>中国最具影响力创新成果100强第七名</h3>
            <div class="row">
                <div class="col col-xs-3 ws-bs-item bot">
                    <a href="##">
                        <div class="txt-box">
                            <img data-original="${CURRENT_STATIC_PATH}/images/index/bs1.png" class="img-bg inslyzimg" alt="">
                            <p class="txt-p">
                                西软公司具备领域模型整合能力，可针对不同教育管理机构、不同学校的需求，进行适当的裁取和个性化应用配置与开发 ，从而灵活地满足不同的需求类型。
                            </p>
                        </div>
                        <div class="tit-box">
                            <i class="bs-icon bs-icon1"></i>
                            <h4>教育信息化</h4>
                        </div>
                    </a>
                </div>
                <div class="col col-xs-3 ws-bs-item top">
                    <a href="##">
                        <div class="tit-box">
                            <i class="bs-icon bs-icon2"></i>
                            <h4>煤炭矿山行业</h4>
                        </div>
                        <div class="txt-box">
                            <img data-original="${CURRENT_STATIC_PATH}/images/index/bs2.png" class="img-bg inslyzimg" alt="">
                            <p class="txt-p">
                                西软公司煤炭事业部致力于为中国煤炭矿山行业政府监督机构安全监督管理、生产企业安全生产管理提供完善的信息化建设解决方案和优质服务。
                            </p>
                        </div>
                    </a>
                </div>
                <div class="col col-xs-3 ws-bs-item bot">
                    <a href="##">
                        <div class="txt-box">
                            <img data-original="${CURRENT_STATIC_PATH}/images/index/bs3.png" class="img-bg inslyzimg" alt="">
                            <p class="txt-p">
                                西软股份是国内专注于石油行业信息化服务的高新技术 企业。
                            </p>
                        </div>
                        <div class="tit-box">
                            <i class="bs-icon bs-icon3"></i>
                            <h4>石油化工行业</h4>
                        </div>
                    </a>
                </div>
                <div class="col col-xs-3 ws-bs-item top">
                    <a href="##">
                        <div class="tit-box">
                            <i class="bs-icon bs-icon4"></i>
                            <h4>知识型服务型组织</h4>
                        </div>
                        <div class="txt-box">
                            <img data-original="${CURRENT_STATIC_PATH}/images/index/bs4.png" class="img-bg inslyzimg" alt="">
                            <p class="txt-p">
                                管理者可以在一个平台上针对某些素从不同的角度，进行有效地计划、组织、执行、协调与沟通。
                            </p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div><!-- business end -->

    <!-- NEWS -->
    <%@ include file="news.jsp"%>

    <!-- our solution -->
    <a id="porject"></a>
    <div class="ws-solution">
        <!-- title -->
        <div class="line-title">
            <h1 class="txt-ch">我们的解决方案</h1>
            <p class="txt-en">SOLUTION</p>
            <span class="blue-short-line"></span>
        </div>
        <div class="container">
            <div class="solution-tab">
                <!-- Nav tabs -->
                <ul class="nav clearfix" role="tablist">
                <c:forEach var="obj" items="${data.tradeList}" varStatus="status">
                    <li role="presentation" class="${status.index==0?'active':''}">
                        <a href="#solution${status.index}" aria-controls="solution${status.index}" role="tab" data-toggle="tab">
                            <img class="img-bg inslyzimg" data-original="${FILE_PATH}${obj.imgPath}" alt="" srcset="">
                            <div class="icon-tit">
                                <img class="inslyzimg" data-original="${FILE_PATH}${obj.iconPath}" alt="" >
                                <h2>${obj.name }</h2>
                            </div>
                        </a>
                    </li>
                </c:forEach>
                </ul>
                <!-- Tab panes -->
                <div class="tab-content">
	                <c:forEach var="obj" items="${data.tradeList}" varStatus="status">
	                <div role="tabpanel" class="tab-pane ${status.index==0?'active':''}" id="solution${status.index}">
                        	<div class="tab-pane-tit">
                            - ${obj.name }
	                        </div>
	                        <div class="row">
	                        <c:forEach var="obj2" items="${data.solutionDetailsData}" varStatus="status2">
	                        	<c:if test="${obj2.key==obj.id}">
		                        	<div class="col col-xs-4">
			                        	<c:forEach var="sol" items="${obj2.value}" varStatus="statusSol">
			                                <c:if test="${statusSol.index%3==0}">
					                        	<ul>
				                                    <li class="tab-pane-item">
				                                        <a target="_blank" href="${CTX_PATH}/solution/${sol.id}.html">
				                                            >> ${sol.title }
				                                        </a>
				                                    </li>
				                                </ul>
				                        	</c:if>
		                        		</c:forEach>
		                            </div>
		                            
		                            <div class="col col-xs-4">
			                        	<c:forEach var="sol" items="${obj2.value}" varStatus="statusSol">
			                                <c:if test="${statusSol.index%3==1}">
					                        	<ul>
				                                    <li class="tab-pane-item">
				                                        <a target="_blank" href="${CTX_PATH}/solution/${sol.id}.html">
				                                            >> ${sol.title }
				                                        </a>
				                                    </li>
				                                </ul>
				                        	</c:if>
		                        		</c:forEach>
		                            </div>
		                            
		                            <div class="col col-xs-4">
			                        	<c:forEach var="sol" items="${obj2.value}" varStatus="statusSol">
			                                <c:if test="${statusSol.index%3==2}">
					                        	<ul>
				                                    <li class="tab-pane-item">
				                                        <a target="_blank" href="${CTX_PATH}/solution/${sol.id}.html">
				                                            >> ${sol.title }
				                                        </a>
				                                    </li>
				                                </ul>
				                        	</c:if>
		                        		</c:forEach>
		                            </div>
	                        	</c:if>
                           </c:forEach>
	                        </div>
	                    </div>
	                </c:forEach>
                </div>
            </div>
        </div>
    </div>

    <!-- our case -->
    <a id="cases"></a>
    <div class="ws-case">
        <div class="ws-case-bg">
            <!-- title -->
            <div class="line-title white">
                <h1 class="txt-ch">我们的商业案例</h1>
                <p class="txt-en">CASE</p>
                <span class="blue-short-line"></span>
            </div>
            <h3 class="tit-caption">
                中国商用软件KM&CC领域TOP 10
                <br/>没有最好只有更好
            </h3>
        </div>
        
        <div class="container">
            <div class="case-box">
                <div class="title">成功案例</div>
                <!-- Nav tabs -->
                <ul class="nav case-nav-tab" role="tablist">
	                <c:forEach var="obj" items="${data.tradeList}" varStatus="status">
	                    <li role="presentation" class="${status.index==0?'active':''}">
	                        <a href="#case${status.index}" aria-controls="case1" role="tab" data-toggle="tab">${obj.name}</a>
	                    </li>
	                </c:forEach>
                </ul>
                
                <!-- Tab panes -->
                <div class="tab-content">
                <c:forEach var="obj" items="${data.tradeList}" varStatus="status">
                 	<div role="tabpanel" class="tab-pane fade in ${status.index==0?'active':''}" id="case${status.index }">
                      <div class="row">
		                 <c:forEach var="obj2" items="${data.successCaseData}" varStatus="status2">
			                 <c:if test="${obj2.key==obj.id}">
					                 <c:forEach var="succ" items="${obj2.value}" varStatus="statusSucc">
					                            <div class="col col-xs-3 case-item">
					                                <a target="_blank" href="${CTX_PATH}/successcase/${succ.id}.html">
					                                    <div class="case-img">
					                                        <img src="${FILE_PATH}${succ.imgPath}" alt="" srcset="">
					                                        <div class="watch-more">点击查看</div>
					                                    </div>
					                                    <p class="case-name">
					                                        ${succ.title }<br/>应用案例
					                                    </p>
					                                </a>
					                            </div>
					                 </c:forEach>
			                 </c:if>
		                 </c:forEach>
                       </div>
                    </div>
                 </c:forEach>
                </div>

            </div>
        </div>
    </div>

    <!-- XIRUAN INTRO -->
    <a id="indc"></a>
    <div class="ws-intro">
        <!-- title -->
        <div class="line-title">
            <h1 class="txt-ch">西软简介</h1>
            <p class="txt-en">XIRUAN</p>
            <span class="blue-short-line"></span>
        </div>
        <div class="container">
            <div class="row" style="margin: 50px 0;">
                <div class="col-xs-6">
                    <img class="inslyzimg" data-original="${CURRENT_STATIC_PATH}/images/aboutUs/xr-intro.png" width="100%" alt="西软简介" srcset="">
                </div>
                <div class="col-xs-6">
                    <div class="xr-intro-txt">
                        <p>西软软件股份有限公司（以下简称：西软）是中西部地区大型的专业化管理咨询、信息技术、外包服务和为政府及企事业单位提供创新性服务的提供商之一。西软于2000年通过发起方式设立，注册资金6500万元人民币，是国家重点软件企业，国家火炬计划软件产业基地骨干企业，国内较早通过ISO9001(2000)国际质量认证的软件企业之一。</p>
                        <p>公司总部位于西安高新技术产业开发区，拥有2000多平方米自主产权的研发基地，并在北京、上海、郑州、杭州、乌鲁木齐等多个城市与地区设有分公司或办事处。</p>
                        <p>西软秉持“沟通促进创新，合作创造价值”的经营理念，成立伊始，就有机地整合了高校、政府、企业等方面的优势资源。以“依赖我们优秀的人才与杰出团队，创造性地融合前沿的信息技术、管理科学及用户独特的个性需求，帮助客户明确战略，优化流程，集成系统，引进创新，提高整体竞争优势,
                        成为绩效卓越的组织”为使命，提出“柔性化功能、个性化服务”的产品路线，成功地开发了柔性企业资源计划系统（FERP）、柔性运营资源管理平台（FORP）、柔性分销计划系统（FDRP）、石油工程技术服务信息平台（PMIP）、矿山安全管理信息平台（CMIP）、电子商务平台等软件。在电子商务、电子政务、离散制造业、流程加工业、石油工程服务、矿山等行业的信息化建设方面积累了丰富的经验，被用户誉为“拥有先进管理思想的软件专家”。</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="three-area">
            <div class="container">
                <div class="img-bg">
                    <h1>业务服务范围</h1>
                </div>
            </div>
        </div>
        <div class="three-area-box">
            <div class="container">
                <div class="row" style="padding: 0 40px">
                    <div class="col-xs-3">
                        <div class="area-item">
                            <h1>信息化战略规划</h1>
                            <p>西软根据客户的总体战略要求和客户自身的实际情况对信息化建设进行全局的观察和分析，对企业信息化的发展目标和方向制定基本谋划和战略部署，并提出纲要性的目标和指导，使信息化建设与业务结合上考虑得的更加缜密细致，目的性、计划性更强。以达到帮助企业推动战略目标的实现和总体拥有成本最低的目标。</p>
                        </div>
                    </div>
                    <div class="col-xs-3">
                        <div class="area-item">
                            <h1>客户化软件定制开发</h1>
                            <p><!-- 为了使客户能够拥有完全符合自身应用和管理要求、具有良好用户体验、具有量身定做特点的软件系统， -->西软在为客户提供专业的管理软件咨询服务的基础上，同时为客户提供软件定制开发服务。通过软件的定制开发，可以很好地解决商品化软件普遍存在的不足（例如：业务管理模式专业性不深、软件操作方便性不足、人机交互友好性相对较差、软件功能升级和扩展难度较大、无法满足客户的全部应用需求等），使客户拥有一套真正属于自己、满足自身全部应用要求的管理软件系统。</p>
                        </div>
                    </div>
                    <div class="col-xs-3">
                        <div class="area-item">
                            <h1>信息化工程项目监理</h1>
                            <p>通过西软的专家团队和技术团队，协助建设单位制定信息化项目规划、技术方案，以及设备选型方案。并对信息工程项目立项、设计、实施、工程验收及保修的全过程进行质量控制、进度控制、投资控制、变更控制、合同控制、信息及安全管理、协调等方面的监理，以达到保护建设单位利益的目的。</p>
                        </div>
                    </div>
                    <div class="col-xs-3">
                        <div class="area-item">
                            <h1>信息系统运维服务</h1>
                            <p>依托西软多年来的IT运维服务实施和管理经验，在追求为客户提供高品质IT服务目标的同时，倡导“服务管理体系化，服务技术专业化，服务实施规范化”的服务理念，为客户提供信息化运维咨询服务、运维外包服务以及各种专业技术（包括系统性能诊断和优化、高可用性设计与实施、数据信息安全保护、网络设备加固与调优、专业维修等）的服务。</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- qualification -->
    <a id="honor"></a>
    <div class="ws-qualification">
        <!-- title -->
        <div class="line-title white">
            <h1 class="txt-ch">荣誉资质</h1>
            <p class="txt-en">QUALIFICATION</p>
            <span class="blue-short-line"></span>
        </div>
    
        <div class="container">
            <p class="white-p"> 作为一家管理软件企业，技术是永恒的动力，创新是持续发展的基石。
                <br/> 西软一直专注于研发最先进的管理软件，提倡创新的理念，用创新性的产品与服务不断满足客户变化的需求。
                <br/> 基于自有知识产权的柔性软件生产平台，构建符合用户需求的应用，将应用智慧融入到产品或解决方案中，为客户带来价值。
            </p>
            <div class="qualification-tab">
    
                <!-- Nav tabs -->
                <ul class="nav" role="tablist" id="courseTab">
                    <li role="presentation" class="active">
                        <a href="#qualification1" aria-controls="qualification1" role="tab" data-toggle="tab">
                            <span class="circle-num">1</span>
                            <h2>管理模型创新</h2>
                            <p>管理思想与管理模型是 管理软件的灵魂。西软 拥有一流的专家团队， 致力于管理模型的持续 改进与创新。</p>
                        </a>
                    </li>
                    <li role="presentation">
                        <a href="#qualification2" aria-controls="qualification3" role="tab" data-toggle="tab">
                            <span class="circle-num">2</span>
                            <h2>产品创新</h2>
                            <p>西软定位明确，一直将 研发管理软件作为发展 目标，以应用为主进行 管理软件规模化发展， 不断满足企业个性需求， 支持企业持续的 渐进变革</p>
                        </a>
                    </li>
                    <li role="presentation">
                        <a href="#qualification3" aria-controls="qualification3" role="tab" data-toggle="tab">
                            <span class="circle-num">3</span>
                            <h2>解决方案创新</h2>
                            <p>西软“以市场为导向”， 通过与客户密切的沟通， 向客户创造性地提供个 性化的产品及服务，将 应用智慧融入到产品， 从而为客户带 来价值</p>
                        </a>
                    </li>
                </ul>
    
                <!-- Tab panes -->
                <div class="tab-content">
                    <div role="tabpanel" class="tab-pane fade in active" id="qualification1">
                        <div class="row">
                            <div class="col-xs-6">
                                <ul>
                                    <li>荣获国家高新技术企业称号</li>
                                    <li>国内首家通过美国石油学会（API）质量认证企业</li>
                                    <li>国家火炬计划示范企业</li>
                                    <li>获得中国质量认证机构国家认可委员会专家高度评价企业</li>
                                </ul>
                            </div>
                            <div class="col-xs-6">
                                <ul>
                                    <li>荣获中国制造业信息化高速成长IT企业称号</li>
                                    <li>荣获陕西省知识产权优势培育企业称号</li>
                                    <li>多项产品获得科技部国家重点新产品推荐称号</li>
                                    <li>多项产品获得软件协会优秀产品称号</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane fade" id="qualification2">
                        <div class="row">
                            <div class="col-xs-6">
                                <ul>
                                    <li>多项产品荣获中国国际软件博览会金奖</li>
                                    <li>刘洪涛总经理被评为“2004年度中国制造业信息化十大风云人物”</li>
                                    <li>获得陕西省“双软”认证企业</li>
                                    <li>获得陕西省“优秀软件企业”称号</li>
                                </ul>
                            </div>
                            <div class="col-xs-6">
                                <ul>
                                    <li>获得陕西省“科技创新企业”称号</li>
                                    <li>获得ISO9001认证</li>
                                    <li>获得国家发改委、科技部、中科协、中科院等多部委指导、评定的“2006中国最具影响力创新成果”100强第8强</li>
                                    <li>FORP、FERP获得国家2006年度“中国自主创新优秀成果奖”</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane fade" id="qualification3">
                        <div class="row">
                            <div class="col-xs-6">
                                <ul>
                                    <li>获得2007最具影响力百强企业称号</li>
                                    <li>刘洪涛总经理被评为“2007中国最具影响力十大创新人物”</li>
                                    <li>CMIP获得第十一届软博会金奖</li>
                                    <li>获2007-2008年度CBI中国IT渠道百强企业</li>
                                </ul>
                            </div>
                            <div class="col-xs-6">
                                <ul>
                                    <li>靖远煤业本质安全信息管理平台荣获国家安全生产监督管理总局2009年度安全生产科技成果三等奖</li>
                                    <li>2009年、2010年度两次荣获中国商用软件KM&CC领域TOP10</li>
                                    <li>2009年度西安软件园优秀创新型企</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="certificate-wall-title">
                资质证书
            </div>
            <div class="certificate-wall">  
                <ul id="certificate" class="certificate-wall-ul clearfix">
                    <li>
                        <img class="inslyzimg" data-original="${CURRENT_STATIC_PATH}/images/index/qt-s1.png" data-original="${CURRENT_STATIC_PATH}/images/index/qt-bg1.jpg" alt="营业执照">
                    </li>
                    <li>
                        <img class="inslyzimg" data-original="${CURRENT_STATIC_PATH}/images/index/qt-s2.png" data-original="${CURRENT_STATIC_PATH}/images/index/qt-bg2.jpg" alt="质量管理体系认证证书">
                    </li>
                    <li>
                        <img class="inslyzimg" data-original="${CURRENT_STATIC_PATH}/images/index/qt-s3.png" data-original="${CURRENT_STATIC_PATH}/images/index/qt-bg3.jpg" alt="等级证书">
                    </li>
                    <li>
                        <img class="inslyzimg" data-original="${CURRENT_STATIC_PATH}/images/index/qt-s4.png" data-original="${CURRENT_STATIC_PATH}/images/index/qt-bg4.png" alt="软件企业认定证书">
                    </li>
                    <li>
                        <img class="inslyzimg" data-original="${CURRENT_STATIC_PATH}/images/index/qt-s5.png" data-original="${CURRENT_STATIC_PATH}/images/index/qt-bg5.png" alt="高新技术企业证书">
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <!-- partner -->
    <a id="partner"></a>
    <div class="ws-partner">
        <!-- title -->
        <div class="line-title">
            <h1 class="txt-ch">服务合作</h1>
            <p class="txt-en">PARTNER</p>
            <span class="blue-short-line"></span>
        </div>
        
        <div class="container">
            <div class="flexslider partner-flexslider" id="partner-flexslider">
                <ul class="slides partner-slides">
                    <li>
                        <div class="row partner-row">
                            <div class="col-xs-3 partner-col"><img class="inslyzimg" data-original="${CURRENT_STATIC_PATH}/images/partner/1.png" alt=""></div>
                            <div class="col-xs-3 partner-col"><img class="inslyzimg" data-original="${CURRENT_STATIC_PATH}/images/partner/2.png" alt=""></div>
                            <div class="col-xs-3 partner-col"><img class="inslyzimg" data-original="${CURRENT_STATIC_PATH}/images/partner/3.png" alt=""></div>
                            <div class="col-xs-3 partner-col"><img class="inslyzimg" data-original="${CURRENT_STATIC_PATH}/images/partner/4.png" alt=""></div>
                        </div>
                        <div class="row partner-row">
                            <div class="col-xs-3 partner-col">
                                <img class="inslyzimg" data-original="${CURRENT_STATIC_PATH}/images/partner/5.png" alt="">
                            </div>
                            <div class="col-xs-3 partner-col">
                                <img class="inslyzimg" data-original="${CURRENT_STATIC_PATH}/images/partner/6.png" alt="">
                            </div>
                            <div class="col-xs-3 partner-col">
                                <img class="inslyzimg" data-original="${CURRENT_STATIC_PATH}/images/partner/7.png" alt="">
                            </div>
                            <div class="col-xs-3 partner-col">
                                <img class="inslyzimg" data-original="${CURRENT_STATIC_PATH}/images/partner/8.png" alt="">
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="row partner-row">
                            <div class="col-xs-3 partner-col">
                                <img class="inslyzimg" data-original="${CURRENT_STATIC_PATH}/images/partner/9.png" alt="">
                            </div>
                            <div class="col-xs-3 partner-col">
                                <img class="inslyzimg" data-original="${CURRENT_STATIC_PATH}/images/partner/10.png" alt="">
                            </div>
                            <div class="col-xs-3 partner-col">
                                <img class="inslyzimg" data-original="${CURRENT_STATIC_PATH}/images/partner/11.png" alt="">
                            </div>
                            <div class="col-xs-3 partner-col">
                                <img class="inslyzimg" data-original="${CURRENT_STATIC_PATH}/images/partner/12.png" alt="">
                            </div>
                        </div>
                        <div class="row partner-row">
                            <div class="col-xs-3 partner-col">
                                <img class="inslyzimg" data-original="${CURRENT_STATIC_PATH}/images/partner/13.png" alt="">
                            </div>
                            <div class="col-xs-3 partner-col">
                                <img class="inslyzimg" data-original="${CURRENT_STATIC_PATH}/images/partner/14.png" alt="">
                            </div>
                            <div class="col-xs-3 partner-col">
                                <img class="inslyzimg" data-original="${CURRENT_STATIC_PATH}/images/partner/15.png" alt="">
                            </div>
                            <div class="col-xs-3 partner-col">
                                <img class="inslyzimg" data-original="${CURRENT_STATIC_PATH}/images/partner/16.png" alt="">
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="row partner-row">
                            <div class="col-xs-3 partner-col">
                                <img class="inslyzimg" data-original="${CURRENT_STATIC_PATH}/images/partner/17.png" alt="">
                            </div>
                            <div class="col-xs-3 partner-col">
                                <img class="inslyzimg" data-original="${CURRENT_STATIC_PATH}/images/partner/18.png" alt="">
                            </div>
                            <div class="col-xs-3 partner-col">
                                <img class="inslyzimg" data-original="${CURRENT_STATIC_PATH}/images/partner/19.png" alt="">
                            </div>
                            <div class="col-xs-3 partner-col">
                                <img class="inslyzimg" data-original="${CURRENT_STATIC_PATH}/images/partner/20.png" alt="">
                            </div>
                        </div>
                        <div class="row partner-row">
                            <div class="col-xs-3 partner-col">
                                <img class="inslyzimg" data-original="${CURRENT_STATIC_PATH}/images/partner/21.png" alt="">
                            </div>
                            <div class="col-xs-3 partner-col">
                                <img class="inslyzimg" data-original="${CURRENT_STATIC_PATH}/images/partner/22.png" alt="">
                            </div>
                            <div class="col-xs-3 partner-col">
                                <img class="inslyzimg" data-original="${CURRENT_STATIC_PATH}/images/partner/23.png" alt="">
                            </div>
                            <div class="col-xs-3 partner-col">
                                <img class="inslyzimg" data-original="${CURRENT_STATIC_PATH}/images/partner/24.png" alt="">
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div> 

    <!-- contact us -->
    <a id="contact"></a>
    <div style="background-color: #f5f5f5;margin-top: 110px;">
        <div class="container">
            <div class="about-contact-container">
                <img src="${CURRENT_STATIC_PATH}/images/aboutUS/ws-map.png" class="ws-map" alt="" srcset="">
                <div class="address-wrap">
                    <p>目前，公司拥有员工230余人，由各类专业人员组成（包括：行业专家、能力专家以及熟悉当地市场的专业人员），并拥有当前两大主流技术路线（JAVA和.NET）的研发团队，他们利用严谨的方法论和先进技术为客户提供迅速可靠、经济有效的解决方案。公司员工85%以上具有大学本科学历，硕士、博士达25%以上，且大部分具有计算机与管理双专业背景，从而在管理、软件工程、信息技术等学科方面汇聚了一批深有造诣的管理和技术专家，有力地推动了公司的健康发展。</p>
                    <p>西软每年将10%的营业收入投入到研发领域。利用这些研发投资，帮助客户制定创新业务战略和技术，将其商业化并加以推广，并为客户开发市场化的解决方案。公司的研究和创新项目旨在向客户提供制定创新解决方案的前瞻性洞察力，并为客户制定以高绩效企业为目标的战略。</p>
                    <p>西软的独特优势在于：既能够为客户设计制胜战略，又具有强大的实施能力帮助客户实现其战略愿景。公司在国内的项目涵盖了广泛的行业和各种类型的解决方案，为大型的国有企业提供企业转型的咨询和服务，帮助它们转变成更加以市场为导向的企业。</p>
                    <ul>
                        <li><i class="glyphicon glyphicon-object-align-bottom"></i>地址：西安市太白南路181号西部电子社区A-A-4</li>
                        <li><i class="glyphicon glyphicon-envelope"></i>邮编：710065</li>
                        <li><i class="glyphicon glyphicon-phone-alt"></i>电话：400-666-1206</li>
                        <li><i class="glyphicon glyphicon-print"></i>传真：029-88234941</li>
                        <li><i class="glyphicon glyphicon-globe"></i>网址：www.westerasoft.com</li>
                    </ul>
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
                        <!-- <ul class="footer-nav-ul">
                            <li>
                                <a href="#part1">新闻动态</a>
                            </li>
                            <li>
                                <a href="#part2">解决方案</a>
                            </li>
                            <li>
                                <a href="#part3">成功案例</a>
                            </li>
                            <li>
                                <a href="#part4">西软简介</a>
                            </li>
                            <li>
                                <a href="#part5">荣誉资质</a>
                            </li>
                            <li>
                                <a href="#part6">服务合作</a>
                            </li>
                            <li>
                                <a href="#part7">联系我们</a>
                            </li>
                        </ul> -->
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
                    <div class="col-xs-3">
                        <p class="ws-name">西软软件股份有限公司西安总公司</p>
                        <ul class="contact-way-ul">
                            <li>地址：西安市太白南路181号西部电子社区A-A-4</li>
                            <li>邮编：710065</li>
                            <li>电话：029-88253031</li>
                            <li>传真：029-88234941</li>
                            <li>网址：www.westerasoft.com</li>
                        </ul>
                        <p class="aq">陕ICP备13007676号-6</p>
                    </div>
                    
                    <div class="col-xs-6" style="text-align: center">
                        <div class="tel">
                            <strong>029-88253031</strong>
                            <p>周一至周五（9：00-18：00）</p>
                            <button class="contact-btn"><i class="glyphicon glyphicon-earphone"></i> 在线客服</button>
                        </div>
                    </div>
                    
                    <div class="col-xs-3">
                        <p class="ws-name">西软旗下子公司</p>
                        <ul class="contact-way-ul">
                            <a href="http://www.forp.cn/" target="_blank"><li>西安西点软件有限责任公司</li></a>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="${CURRENT_STATIC_PATH}/lib/lyz.delayLoading.min.js"></script>
    <script src="${CURRENT_STATIC_PATH}/lib/bootstrap/js/bootstrap.min.js"></script>
    <script src="${CURRENT_STATIC_PATH}/lib/flexslider/jquery.flexslider-min.js"></script>
    <script src="${CURRENT_STATIC_PATH}/lib/viewer/viewer.min.js"></script>
    <script src="${CURRENT_STATIC_PATH}/js/main.js"></script>
</body>

</html>