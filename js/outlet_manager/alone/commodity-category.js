jQ.extend({
	Category:{
		init:function(){
			var categoryURL = jQ("#outletURL").val()+"ajax/commodity/category/list.json";
			new CommodityWindow({id:'commodityWindow',requestUrl:categoryURL,pro:-1,index:0,sid:"0",commodityName:''}).itemClick(function(data){
				if(data.leaf>0){
					if(data.sid.indexOf(":")!=-1){//属性
						var sids = data.sid.split(":");
						if(jQ(".categoryForm").children("input[name='de_v_"+sids[0]+"']").length>0){
							jQ(".categoryForm").children("input[name='de_v_"+sids[0]+"']").val(sids[1]);
						}else{
							jQ(".categoryForm").append("<input type='hidden' name='de_v_"+sids[0]+"' value='"+sids[1]+"' pro='"+data.pro+"' class='proItem'/>");	
						}
					}else{
						if(jQ(".categoryForm").children("input[name='cid']").length>0){
							jQ(".categoryForm").children("input[name='cid']").val(data.sid);
						}else{
							jQ(".categoryForm").append("<input type='hidden' name='cid' value='"+data.sid+"' pro='"+data.pro+"'/>");
						}
						jQ(".categoryForm").children(".proItem").remove();
					}
				}else{
					jQ(".categoryForm").children("input").not("#submitCommodity").remove();
				}
			});
		}
	}
});