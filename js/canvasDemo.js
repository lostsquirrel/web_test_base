	var doc = window.document;
	
	function getCxt (cid) {
		var canvas = doc.getElementById(cid);
		return canvas.getContext("2d");
	}
//图片
	var ctx7 = getCxt("canvas8");
	var img=document.getElementById("scream");
	ctx7.drawImage(img,10,10);

//7 环形渐变
	var ctx7 = getCxt("canvas7");
	var grd = ctx7.createRadialGradient(150,75,50,150,75,49);//参数
	grd.addColorStop(0,"red");
	grd.addColorStop(1,"yellow");

	ctx7.fillStyle=grd;
	ctx7.fillRect(10,10,280,130);

//6 线性渐变
	var ctx6 = getCxt("canvas6");
	var grd = ctx6.createLinearGradient(0,200,150,200); //参数
	grd.addColorStop(0,"red");
	grd.addColorStop(1,"yellow");
	ctx6.fillStyle=grd;
	ctx6.fillRect(10,10,280,130);

//5 空心字
	var ctx5 = getCxt("canvas5");
	ctx5.font="60px Arial";
	ctx5.strokeText("hello world",10,100);

//4 文字
	var ctx4 = getCxt("canvas4");
	ctx4.font="60px Arial"; //字体
	
	ctx4.fillText("hello world",10,100);//文字,文字左下角坐标

//3 画圆
	var ctx3 = getCxt("canvas3");
	// ctx3.beginPath();
	ctx3.arc(100,75,70,0,2*Math.PI); //原点,半径,起始,结束
	ctx3.moveTo(270,75);
	ctx3.arc(200,75,70,0,2*Math.PI); //原点,半径,起始,结束
	ctx3.stroke(); //画圈
	//ctx3.fill(); //填饼

//2 画矩形
	var canvas2 = doc.getElementById("canvas2");
	var ctx2 = canvas2.getContext("2d");
	ctx2.fillStyle="#f00"; //填充颜色
	ctx2.fillRect(5,5,290,140); //起点坐标+长+宽

//1 画直线
	var canvas1 = doc.getElementById("canvas1");
	// console.debug(canvas1);
	var ctx1 = canvas1.getContext("2d");
	// console.debug(ctx1);
	ctx1.moveTo(5,5); //起点
	ctx1.lineTo(295,145); //终点
	// ctx1.stroke();
	ctx1.lineTo(295,5);
	ctx1.lineTo(5,140);
	ctx1.lineTo(5,5);
	ctx1.stroke();





