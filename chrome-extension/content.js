// $('body').append(t);

SC.initialize({
  client_id: 'bdc283e42a80983fd9bea0fa8871be8a'
});

// stream track id 293
// SC.stream("/tracks/293", function(sound){
//   sound.play();
// });

// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     // console.log(sender.tab ?
//     //             "from a content script:" + sender.tab.url :
//     //             "from the extension");
//     if (request.greeting === "hello")
//       sendResponse({farewell: "goodbye"});
//   });


//   console.log(tracks.id);
// });


chrome.runtime.sendMessage({message: "isMusicPlaying"}, function(response) {
	// console.log(response);
  	if (response.message === false) {

		var xhr = new XMLHttpRequest();

		xhr.open("GET", "http://play-hackmit.rhcloud.com/", false);
		xhr.send();

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