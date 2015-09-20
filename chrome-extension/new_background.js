musicPlaying = false;
tabPlaying = "";

// document.getElementById("spotify_frame").remove();
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // console.log(sender);
    if (request.message == "isMusicPlaying") {
      // tabPlaying = sender.tab;
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

chrome.tabs.onRemoved.addListener(function( tabId,  removeInfo) {
    console.log(tabId);
    if (tabId == tabPlaying && musicPlaying) {
      musicPlaying = false;
    }
})
