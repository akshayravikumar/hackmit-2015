console.log("hi");

//$('body').append(t);

SC.initialize({
  client_id: 'bdc283e42a80983fd9bea0fa8871be8a'
});

// stream track id 293

// SC.stream("/tracks/293", function(sound){
//   sound.play();
// });


chrome.runtime.sendMessage({message: "isMusicPlaying"}, function(response) {

	console.log(response);

  	if (response.message === false) {
  		console.log("ready to play");
  		var text = $("body").text();
		var xhr = new XMLHttpRequest();

		var reqString = "We're rolling out the red carpet for Sunday's Emmy Awards – but you don't even need to change out of your sweatpants. Starting at 6:30 p.m. (ET), watch your favorite TV actors – from Uzo Aduba to Amy Schumer to Jon Hamm – arrive in their red carpet best (which will make your sweatpants seem that much more comfortable). \\ We'll also be keeping up with all the latest Emmys news – from big winners to gown details to performances to all the outrageous moments in between (hello, Amy!) – throughout the show. And we want to hear from you, too: Tweet along with us @people, where we'll be dishing on all the Emmys action, funny acceptance speeches and more. "
 		xhr.open("GET", "http://play-hackmit.rhcloud.com/content/?content=" + encodeURI(reqString), false);
		xhr.send();

		var result = xhr.responseText;
		// $.get( "http://play-hackmit.rhcloud.com/", { name: "John", time: "2pm" } )
		//   .done(function( data ) {
		//   	console.log(data);
		//     // alert( "Data Loaded: " + data );
		//   });
		console.log(result);
  		chrome.runtime.sendMessage({message : "musicStarted"}, function(response) {
  			SC.get('/tracks', {tags: "horse"}, function(tracks) {
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

