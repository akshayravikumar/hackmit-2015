// SC.initialize({
//   client_id: 'bdc283e42a80983fd9bea0fa8871be8a'
// });

chrome.runtime.sendMessage({message: "isMusicPlaying"}, function(response) {
	console.log(response);
  	if (response.message === false) {
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
		  			var iframe = document.createElement('iframe');
		  			iframe.setAttribute("z-index", "9999");
		  			iframe.setAttribute("position", "relative");
 					iframe.src = "https://embed.spotify.com/?uri=spotify:track:" + responseText;
					document.body.appendChild(iframe);
		  			//var iframes = document.getElementsByTagName('iframe');
					//for (var i = 0; i < iframes.length; i++) {
					//    iframes[i].parentNode.removeChild(iframes[i]);
					//}
		  			// .getElementById("spotify_frame").src = "https://embed.spotify.com/?uri=spotify:track:" + responseText;
		  			// $("#spotify_frame").src = 
		  			// SC.get('/tracks', {tags: responseText}, function(tracks) {
		  			// 	console.log(tracks);
				  	// 	SC.stream("/tracks/" + tracks[1].id, function(sound){ 
		 				//   	sound.play(function() {
						 //  		alert("hui");
						 //  	});
						 //  });
				  	// });
				});
		    }
		  }
		xmlhttp.open("POST", "http://127.0.0.1:5000/content/"), true;
 		xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
 		console.log(srcList);
 		console.log(encodeURI(srcList));
 		xmlhttp.send("content=" + encodeURI(htmlText) + "&images=images");

  	} 
  	return;
});

