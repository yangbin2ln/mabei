/* ------ */
$(document).ready(function() {
  /* index-banner */
  $("#home-flexslider").flexslider({
    directionNav: true,
    pauseOnAction: false,
    controlNav: false,
    slideshowSpeed: 3000
  });
  $("#partner-flexslider").flexslider({
    directionNav: true,
    pauseOnAction: false,
    controlNav: false,
    slideshowSpeed: 2500
  });
  /* index-ourService-tab */
  $("#courseTab a").hover(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
  /* goDown */
  $("#goDown").on("click", function() {
    $("body,html").animate(
      {
        scrollTop: 630
      },
      1000
    );
    return false;
  });
  /* goTop */
  $("#goTop").on("click", function() {
    $("body,html").animate(
      {
        scrollTop: 0
      },
      1000
    );
    return false;
  });
  /* 资质查看器 */
  $('#certificate').viewer({ url: "data-original" });
  
//延迟加载图片
  $(".inslyzimg").delayLoading({
  	defaultImg: "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAKAAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU1Njg0NkE1RDRGMjExRTdCMEU0RTVDRTkxMDU0NDc1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkU1Njg0NkE2RDRGMjExRTdCMEU0RTVDRTkxMDU0NDc1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTU2ODQ2QTNENEYyMTFFN0IwRTRFNUNFOTEwNTQ0NzUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTU2ODQ2QTRENEYyMTFFN0IwRTRFNUNFOTEwNTQ0NzUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAUEBAZEhknFxcnMiYfJjIuJiYmJi4+NTU1NTU+REFBQUFBQUREREREREREREREREREREREREREREREREREREREARUZGSAcICYYGCY2JiAmNkQ2Kys2REREQjVCRERERERERERERERERERERERERERERERERERERERERERERERERET/wAARCAAUACEDASIAAhEBAxEB/8QASwABAQAAAAAAAAAAAAAAAAAAAAUBAQAAAAAAAAAAAAAAAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAARAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALYAAAAAAAAAAAP/2Q==",    // 预加载前显示的图片
//  	errorImg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC",      // 读取图片错误时替换图片(默认：与defaultImg一样) 
  	imgSrcAttr: "data-original",         // 记录图片路径的属性(默认：originalSrc，页面img的src属性也要替换为originalSrc)
  	beforehand: 0,                       // 预先提前多少像素加载图片(默认：0)
  	event: "scroll",                     // 触发加载图片事件(默认：scroll)
  	duration: "normal",                  // 三种预定淡出(入)速度之一的字符串("slow", "normal", or "fast")或表示动画时长的毫秒数值(如：1000),默认:"normal"
  	container: window,                   // 对象加载的位置容器(默认：window)
  	success: function (imgObj) { },      // 加载图片成功后的回调函数(默认：不执行任何操作)
  	error: function (imgObj) { }         // 加载图片失败后的回调函数(默认：不执行任何操作)
  });
});
