$({
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
});