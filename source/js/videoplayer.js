$(function() {
  var videos  = $(".videoplayer__button");
    videos.on("click", function(){
        var elm = $(".videoplayer"),
            conts   = elm.contents(),
            le      = conts.length,
            ifr     = null;

        for(var i = 0; i<le; i++){
          if(conts[i].nodeType == 8) ifr = conts[i].textContent;
        }
        elm.addClass("player").html(ifr);
        elm.off("click");
    });
});
