var loadCount = 0;
var color = "rgb(255,255,255)";
var blobData;
var blobUrl;
window.onload=function(){
	// 加载img
	var imagesString="";
	for(var i=1;i<=152;i++){
		imagesString = imagesString + "<img src = './sorry/a_"+i+".JPG' id = 'a_"+i+"' width=1 height=1></img>";
	};
	document.getElementById("images").innerHTML = imagesString;
	// 创建canvas
	var canvasesString = "";
	for(var i=1;i<=152;i++){
		canvasesString = canvasesString + i+"<canvas id='c_"+i+"' style='display:block;width:320px;height:180px;border:1px solid #d3d3d3;'></canvas>";
	};
	document.getElementById("canvases").innerHTML = canvasesString;
		
	
	for(var i=1;i<=152;i++){
		var img = document.getElementById('a_'+i);
		img.onload = function(){
			loadCount = loadCount +1;
		};
	};
	changeColor();
	var timer = window.setInterval(function(){
		document.getElementById("tips").innerHTML = "加载中:"+loadCount+"/152";
		if(loadCount == 152) {
			window.clearInterval(timer);
			document.getElementById("btn_create").disabled=false;
			document.getElementById("tips").innerHTML = "加载完成";
		}
	},50);
};
function changeColor(){
	var red = document.getElementById("red").value;
	var green = document.getElementById("green").value;
	var blue = document.getElementById("blue").value;
	var c_color = document.getElementById('c_color');
	var ctx=c_color.getContext("2d");
	color = "rgb("+red+","+green+","+blue+")";
	ctx.fillStyle = color;
	ctx.fillRect(0,0,500,500);
};

function fill(){
	document.getElementById("line1").value = "好，我是一等良民就不说了";	
	document.getElementById("line2").value = "即使一定要冤枉我";	
	document.getElementById("line3").value = "我也有钱聘请大律师帮我";
	document.getElementById("line4").value = "我想我也坐不了牢了";
	document.getElementById("line5").value = "有钱就可以为所欲为啊？";	
	document.getElementById("line6").value = "sorry，有钱就是可以为所欲为";
	document.getElementById("line7").value = "但我看他是领会不到我的意思";	
	document.getElementById("line8").value = "领会不到 领会不到";
}
function empty(){
	document.getElementById("line1").value = "";	
	document.getElementById("line2").value = "";	
	document.getElementById("line3").value = "";	
	document.getElementById("line4").value = "";	
	document.getElementById("line5").value = "";	
	document.getElementById("line6").value = "";	
	document.getElementById("line7").value = "";	
	document.getElementById("line8").value = "";	
}

function create(){
	document.getElementById("btn_create").disabled=true;
	document.getElementById("download").innerHTML = "";
	document.getElementById("tips").innerHTML = "生成中...";

	var line1 = document.getElementById("line1").value;
	var line2 = document.getElementById("line2").value;
	var line3 = document.getElementById("line3").value;
	var line4 = document.getElementById("line4").value;
	var line5 = document.getElementById("line5").value;
	var line6 = document.getElementById("line6").value;
	var line7 = document.getElementById("line7").value;
	var line8 = document.getElementById("line8").value;
	
	var timer = window.setInterval(function(){
		if(loadCount>=152){
			window.clearInterval(timer);
			
			// 创建gif
			var gif = new GIF({
				works:2,
				quality:10,
				repeat:0,
				width:300,
				height:150,
				debug:false,
				background: '#ffffff',//原透明色替换为白色
				transparent: 0xffffff//把图片中的白色替换为gif的透明色
			});
			
			for(var i=1;i<=152;i++){
				var img = document.getElementById('a_'+i);
				var c = document.getElementById('c_'+i);
				var ctx=c.getContext("2d");
				
				ctx.drawImage(img,0,0,320,180);
				ctx.lineWidth = 0.5;
				ctx.fillStyle = color;
				ctx.strokeStyle = "black";
				ctx.textAlign="center";
				ctx.font="20px sans-serif";
				var words ="";
				if(i>=1 && i<=31) words=line1;
				else if(i>=32 && i<=49) words=line2;
				else if(i>=50 && i<=70) words=line3;
				else if(i>=71 && i<=82) words=line4;
				else if(i>=84 && i<=95) words=line5;
				else if(i>=97 && i<=122) words=line6;
				else if(i>=125 && i<=138) words=line7;
				else if(i>=140 && i<=152) words=line8;
				ctx.strokeText(words,152,145);
				ctx.fillText(words,152,145);
				
				gif.addFrame(ctx,{delay:100});
			};
			gif.on('finished', function(blob) {
				blobData=blob;
				blobUrl = URL.createObjectURL(blob);
				document.getElementById("result").src = blobUrl;
				var downloadA = document.getElementById("download");
				downloadA.innerHTML = "下载";
				document.getElementById("tips").innerHTML = "";
				/*
				var reader = new FileReader();
				reader.readAsDataURL(blob);
				reader.onloadend = function(){
					document.getElementById("btn_create").disabled=false;
					var base64data = reader.result;
					//console.info(base64data)
					var src = base64data.substring(22,base64data.length);
					//console.info(src)
					//var src = URL.createObjectURL(blob);
					
					document.getElementById("result").src = base64data;
					document.getElementById("download").href = src;
					document.getElementById("download").innerHTML = "下载";
					document.getElementById("tips").innerHTML = "";
				};
				*/
				
				
				
				
			});

			gif.render();
		};
	},50);
};

function down(){
	if(window.navigator.msSaveOrOpenBlob){
		navigator.msSaveBlob(blob,"sorry.gif");
	}else{
		var link = document.createElement("a");
        link.setAttribute("href", blobUrl);
        link.setAttribute("download", "sorry.gif");

        document.body.appendChild(link);
        link.click();
	}
}