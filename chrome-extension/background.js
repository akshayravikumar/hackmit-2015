
			  
musicPlaying = false;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message == "isMusicPlaying") {
      sendResponse({message: musicPlaying, test: "test"});
    } 
    if (request.message == "musicStarted") {
      musicPlaying = true;
      sendResponse({message : "okay"});
    }
    if (request.message == "musicStopped") {
      musicPlaying = false;
    }
  });
