console.log("hi");

//$('body').append(t);

SC.initialize({
  client_id: 'bdc283e42a80983fd9bea0fa8871be8a'
});

// stream track id 293

// SC.stream("/tracks/293", function(sound){
//   sound.play();
// });


//   console.log(tracks.id);
// });


chrome.runtime.sendMessage({message: "isMusicPlaying"}, function(response) {
	// console.log(response);
  	if (response.message === false) {
  		var text = $("body").text();
		var xhr = new XMLHttpRequest();
 		xhr.open("GET", "http://play-hackmit.rhcloud.com/content/?content=" + text, false);
		xhr.send();
		var result = xhr.responseText;
		// $.get( "http://play-hackmit.rhcloud.com/", { name: "John", time: "2pm" } )
		//   .done(function( data ) {
		//   	console.log(data);
		//     // alert( "Data Loaded: " + data );
		//   });

		console.log(result);
  		chrome.runtime.sendMessage({message : "musicStarted"}, function(response) {
  			SC.get('/tracks', {tags: result}, function(tracks) {
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

