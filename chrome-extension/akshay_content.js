
chrome.runtime.sendMessage({message: "isMusicPlaying"}, function(response) {
	console.log(response);
  	if (response.message !== undefined) {
  		console.log("ready to play");
  		var images = document.getElementsByTagName('img'); 
		var srcList = [];
		for(var i = 0; i < images.length; i++) {
		    srcList.push(images[i].src);
		}
  		var htmlText = $("body").html();
		var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
		var responseText;
		xmlhttp.onreadystatechange=function()
		  {
		  if (xmlhttp.readyState==4 && xmlhttp.status==200)
		    {
		    	responseText = xmlhttp.responseText;
		    	console.log(responseText);
		  		chrome.runtime.sendMessage({message : "musicStarted"}, function(response) {
		  			console.log(responseText);
		  			var iframe_div = document.createElement('div');
		  			iframe_div.setAttribute("style", "style='position:relative;min-width:960px'")
		  			var iframe = document.createElement('iframe');
		  			iframe_div.setAttribute("z-index", "9999");
		  			iframe.setAttribute("z-index", "9999");
		  			iframe.setAttribute("style", "position: absolute;right:0;top:0");
 					iframe.src = "https://embed.spotify.com/?uri=spotify:track:" + responseText;
					document.body.insertBefore(iframe_div, document.body.firstChild);
					iframe_div.appendChild(iframe);
				});
		    }
		  }
 		xmlhttp.open("POST", "http://play-hackmit.rhcloud.com/content/", true);
		//xmlhttp.open("POST", "http://127.0.0.1:5000/content/"), true;
 		xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
 		console.log(srcList);
 		console.log(encodeURIComponent(srcList));
    thing = encodeURIComponent(srcList)
    if(srcList.length == 0){
      thing = ""
    }
 		xmlhttp.send("content=" + encodeURIComponent(htmlText) + "&images=" + thing);

  	}
  	return;
});

