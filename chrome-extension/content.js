console.log("hi");

//$('body').append(t);

SC.initialize({
  client_id: 'bdc283e42a80983fd9bea0fa8871be8a'
});




chrome.runtime.sendMessage({message: "isMusicPlaying"}, function(response) {
	// console.log(response);
    console.log("hi");
  	if (response.message === false) {

		var xhr = new XMLHttpRequest();

		xhr.open("GET", "http://play-hackmit.rhcloud.com/content/", false);
		xhr.setRequestHeader("Content", "asdfasdfasdfasdf");
    xhr.send(null);

		var result = xhr.responseText;
		console.log(result);
  		chrome.runtime.sendMessage({message : "musicStarted"}, function(response) {
  			SC.get('/tracks', {tags: result}, function(tracks) {
  				console.log(tracks)
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

