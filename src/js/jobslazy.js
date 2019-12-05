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

						if(that.curpage == that.totalpages){
							$(".loadmore").html("所有数据加载完成");
						}else{
							$(".loadmore").html("下拉加载更多数据...");
							that.listenScroll(objHtml);
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