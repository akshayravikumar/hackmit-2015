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
		xmlhttp.open("POST", "http://play-hackmit.rhcloud.com/content/");
		console.log("hello");
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		console.log("hello");
		jsonToSend = JSON.stringify({images: srcList, content: htmlText});
 		xmlhttp.send(jsonToSend);
		console.log("hello");
		var result = xmlhttp.responseText;
		console.log(result);

  		chrome.runtime.sendMessage({message : "musicStarted"}, function(response) {
  			console.log("sent message");
  			SC.get('/tracks', {tags: "rickrolled"}, function(tracks) {
  				console.log(tracks);
		  		SC.stream("/tracks/" + tracks[0].id, function(sound){ 
 				  	sound.play(function() {
				  		alert("hui");
				  	});
				  });
		  	});
		});
  	} 
  	return;
});

