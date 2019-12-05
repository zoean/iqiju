console.log(window)
//$(".clientHeight").height(getBrowserInterfaceSize().pageHeight - $(".header-bd").height() + 'px')
//可视区高度 不包含上方地址栏和下方操作栏
var pageHeight = getBrowserInterfaceSize().pageHeight;
$(".clientHeight").height(pageHeight) + 'px';
$(".swiper-slide,.swiper-container").height(pageHeight) + 'px';
$(".swiper-wrapper").height(pageHeight * 4 + 'px');
//第二屏子导航位置
var subNavHeight = $(".pro_nav").height();
var subNavTop = pageHeight - subNavHeight - 10;
console.log(subNavTop)
$(".pro_nav,.next").css("top",subNavTop + "px");
console.log();

$(".menu").on("click", function(){
	$("nav").show().height(getBrowserInterfaceSize().pageHeight + 'px');
	$("body").addClass("nomove");
})

$("nav p").on("click", function (){
	$("nav").hide();
	$("body").removeClass("nomove");
})

$(".pro_nav li").on("click",function (){
	var index = $(this).attr("index");
	$(".pro_nav li").removeClass("cur");
	$(".pro_cont,.section2-bg div").hide();
	$(this).addClass("cur");
	$(".pro_cont").eq(index).show();
	$(".section2-bg div").eq(index).show();
})

// $(".pro_nav li").on("click", function(){
// 	var index = $(this).attr("index");
// 	$(".pro_nav li").removeClass("cur");
// 	$(this).addClass("cur");
// 	$(".pro_cont").hide();
// 	$(".pro_cont").eq(index).show();
// })

var startX,endX;
$(".pro_cont a").bind('touchstart', function (e){
	startX = e.changedTouches[0].pageX;
})

$(".pro_cont a").bind('touchend', function (e){
	endX = e.changedTouches[0].pageX;
	var index = Number($(this).attr('index'));
	console.log(index)
	if(startX > endX){
		console.log('左滑');
		console.log(index)
		console.log($(".pro_nav li").length - 1)
		if(index < $(".pro_nav li").length - 1){
			index++;
			$(".pro_nav li").removeClass("cur");
			$(".pro_cont,.section2-bg div").hide();
			$(".pro_nav li").eq(index).addClass("cur");
			$(".pro_cont").eq(index).show();
			$(".section2-bg div").eq(index).show();
		}
	}else if( startX < endX){
		if(index > 0){
			index--;
			$(".pro_nav li").removeClass("cur");
			$(".pro_cont,.section2-bg div").hide();
			$(".pro_nav li").eq(index).addClass("cur");
			$(".pro_cont").eq(index).show();	
			$(".section2-bg div").eq(index).show();
		}
	}
})

$(".tabnav li").on("click", function(){
	var index = $(this).attr("index");
	$(".tabnav li").removeClass("cur");
	$(this).addClass("cur");
	$(".intro div.cont").hide();
	$(".intro div.cont").eq(index).show();
})
var lazyload = {
			curpage:1,
			pagerows:5,
			totalrows:0,
			totalpages:0,
			targetHtml:"",
			originalUrl:"http://op.admin.jufan.tv/api/newsList?callbackname=?",
			requestUrl: this.originalUrl,
			init: function(objHtml) {
				this.getList(objHtml);
			},
			getList: function (objHtml){
				var that = this;
				this.requestUrl = this.originalUrl+"&page=" + this.curpage + "&rows=" + this.pagerows;
				$.getJSON(this.requestUrl, function (json){
					try{
						that.totalrows = json.totalRow;
						// if(that.totalrows%that.pagerows == 0){
						// 	that.totalpages = that.totalrows/that.pagerows;
						// }else{
						// 	that.totalpages = that.totalrows/that.pagerows + 1;
						// }
						//that.totalpages = Math.floor((that.totalrows + that.pagerows - 1)/that.pagerows);
						that.totalpages = json.totalPage;
						var dataList = json.list;
						that.showData(dataList, objHtml);
						if(that.totalrows==0){
							$(".loadmore").html("暂无数据");
						}else{
							if(that.curpage == that.totalpages){
								$(".loadmore").html("所有数据加载完成");
							}else{
								$(".loadmore").html("下拉加载更多数据...");
								that.listenScroll(objHtml);
							}
						}						
					}catch(e){
						console.log(e)
					}
				})
				console.log('lazyloadgetlist')
				// $.ajax({
				// 	type: "get",
				// 	url: that.requestUrl,
				// 	data:"page=" + this.page + "&rows=" + this.rows,
				// 	dataType:"jsonp",
				// 	jsonp:"callbackname",
				// 	success: function (json){
				// 		console.log(json);
				// 	}
				// })
			},
			showData: function (dataList, objHtml){
				if(this.totalrows > 0){
					var str = "";
					$.each(dataList, function (i, item){
						str += '<a href="news_detail.html?id='+item.id+'"><h2>'+ item.title +'</h2><p>'+ item.summary+'...</p><p><s class="time"></s><span>'+ item.create_time +'</span></p></a>'
					})
					$(str).appendTo(objHtml);
				}else{
					$(".loadmore").html('暂无数据');
				}
				
			},
			listenScroll: function (objHtml){
				var that = this;
				$(window).on("scroll", function (){
					if(($(window).scrollTop() + $(window).height()) >= $(document).height()){
						// console.log(that.curpage)
						// console.log(that.totalpages)
						if(that.curpage < that.totalpages){
							that.curpage++;
							that.getList(objHtml);
						}else{					
							$(".loadmore").html("所有数据加载完成")
						}
					}
				})
			}
}
lazyload.init(".newslist");

var joblazy = {
		pagerows:10,
		originalUrl:"http://op.admin.jufan.tv/api/jobList?callbackname=?",
		requestUrl: this.originalUrl,
		init: function(objHtml) {
			this.getList(objHtml);
		},
		showData: function (dataList, objHtml){
			if(this.totalrows > 0){
				var str = "";
				$.each(dataList, function (i, item){								
					str += '<dl><dt><a href="job_detail.html?id='+ item.id +'">'+ item.name +'</a></dt><dd><span>'+ item.working_place +'</span><span>'+ item.role +'</span><span>'+ item.pub_date +'</span><a href="job_detail.html?id='+ item.id +'">查看</a></dd></dl>'
				})
				console.log(str)
				$(str).appendTo(objHtml);
			}else{
				$(".loadmore").html('暂无数据')
			}			
		}
	}
	Object.setPrototypeOf(joblazy, lazyload);
	joblazy.init(".joinus")

var mienlazy = {
	pagerows:10,
	originalUrl:"http://op.admin.jufan.tv/api/mienList?callbackname=?",
	requestUrl: this.originalUrl,
	meinDetail:"http://op.admin.jufan.tv/api/mienDetail?callbackname=?",
	init: function(objHtml) {
		this.getList(objHtml);
	},
	showData: function (dataList, objHtml){
		var str = "";
		$.each(dataList, function (i, item){
			// str += '<p><a href="../html/jobdetail.html?id='+item.id+'">'+item.name+'</a><span>'+item.role+'</span><span>'+item.working_place+'</span><span>'+item.pub_date+'</span></p>'
			if(item.title.length > 16){
				str += '<li index="'+ item.id +'"><img src="http://op.admin.jufan.tv'+ item.pic_url +'"><p style="line-height:0.5rem;">'+ item.title +'</p><p class="mask"></p></li>'
			}else{
				str += '<li index="'+ item.id +'"><img src="http://op.admin.jufan.tv'+ item.pic_url +'"><p>'+ item.title +'</p><p class="mask"></p></li>'
			}			
		})
		$(str).appendTo(objHtml);
		this.showDetail();
	},
	showDetail: function (){
		var that = this;
		$(".mien_list ol").on('click', function (e){
			var target = e.target.nodeName;			
			if(target == "IMG" || target == "P"){
				var eventObj = e.target.offsetParent;
				var index = $(eventObj).attr("index");
				that.meinDetail = that.meinDetail + "&id=" + index;
				that.getDetail();
			}
		})
	},
	getDetail: function (){
		$.getJSON(this.meinDetail, function (data){
			$(".loadmore,.mien_list").hide();
			$(".mien_cont,.back").show();
			$(".mien_cont").html('<h2>'+ data.title +'</h2><p class="newstime"><s class="time"></s><span>'+ data.create_time +'</span></p>' + data.content);
		})
		$(".mienback").on('click', function (){
			$(".mien_cont,.back").hide();
			$(".loadmore,.mien_list").show();
		})
	}
}
Object.setPrototypeOf(mienlazy, lazyload);
mienlazy.init(".mien_list ol")

function getBrowserInterfaceSize() {
  var pageWidth = window.innerWidth;
  var pageHeight = window.innerHeight;
  if (typeof pageWidth != "number") {
      //在标准模式下面
      if (document.compatMode == "CSS1Compat" ) {
          pageWidth = document.documentElement.clientWidth;
          pageHeight = document.documentElement.clientHeight;
      } else {
          pageWidth = document.body.clientWidth;
          pageHeight = window.body.clientHeight;
      }
  }
  return {
      pageWidth: pageWidth,
      pageHeight: pageHeight
  }
}
// var curStyle = $(".clientHeight").attr('style');
// var clientHstyle = curStyle + 'height:' + getBrowserInterfaceSize().pageWidth + 'px';
// $(".clientHeight").attr({style:clientHstyle});
