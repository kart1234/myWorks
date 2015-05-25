(function () {
  $("#clubRef").on("keypress",function(evt){

  	evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;

  });

  $("#clubRef").on("click",function(){
  	$(".lblWMLTxt").addClass("lblWMSTxt");
  });

  $("body").delegate("#clubRef", "blur", function(b) {
  	if(($("#clubRef")).val().length==0){
  		$(".lblWMLTxt").removeClass("lblWMSTxt");
  	}
  		
  });
})();
