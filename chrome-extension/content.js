console.log("hi");
t = $('body').text();
console.log(t);
//$('body').append(t);

SC.initialize({
  client_id: 'bdc283e42a80983fd9bea0fa8871be8a'
});

// stream track id 293
SC.stream("/tracks/293", function(sound){
  sound.play();
});
