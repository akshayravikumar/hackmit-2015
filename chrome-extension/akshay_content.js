SC.initialize({
  client_id: 'bdc283e42a80983fd9bea0fa8871be8a'
});

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
		// var xhr = new XMLHttpRequest();
		// console.log(srcList);
		// var reqString = "We're rolling out the red carpet for Sunday's Emmy Awards – but you don't even need to change out of your sweatpants. Starting at 6:30 p.m. (ET), watch your favorite TV actors – from Uzo Aduba to Amy Schumer to Jon Hamm – arrive in their red carpet best (which will make your sweatpants seem that much more comfortable). \\ We'll also be keeping up with all the latest Emmys news – from big winners to gown details to performances to all the outrageous moments in between (hello, Amy!) – throughout the show. And we want to hear from you, too: Tweet along with us @people, where we'll be dishing on all the Emmys action, funny acceptance speeches and more. "
 	// 	xhr.open("GET", "http://play-hackmit.rhcloud.com/content/?content=" + encodeURI(reqString), false);
		// xhr.send();
		// var result = xhr.responseText;

		var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
		var responseText;
		xmlhttp.onreadystatechange=function()
		  {
		  if (xmlhttp.readyState==4 && xmlhttp.status==200)
		    {
		    	responseText = xmlhttp.responseText;
		    	console.log(responseText);
		    	// console.log(typeof responseText)
		    	// var json = jQuery.parseJSON(responseText);
		    	// var json = JSON.parse(responseText);
		    	// console.log(json);
		  		chrome.runtime.sendMessage({message : "musicStarted"}, function(response) {
		  			console.log("responseText");
		  			SC.get('/tracks', {tags: responseText}, function(tracks) {
		  				console.log(tracks);
				  		SC.stream("/tracks/" + tracks[1].id, function(sound){ 
		 				  	sound.play(function() {
						  		alert("hui");
						  	});
						  });
				  	});
				});
		    }
		  }
		//xmlhttp.open("POST", "http://127.0.0.1:5000/content/"), true;
 		xmlhttp.open("POST", "http://play-hackmit.rhcloud.com/content/", true);
    //xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
 		xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
 		//jsonToSend = JSON.stringify({images: srcList, content: htmlText});
 		//xmlhttp.send(jsonToSend);
 		console.log(srcList);
 		console.log(encodeURI(srcList));
 		xmlhttp.send("content=" + encodeURI(htmlText) + "&images=images");

  	} 
  	return;
});

