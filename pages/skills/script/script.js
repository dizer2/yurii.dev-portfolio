$(".section").removeClass("section");
$(".header").removeClass("page");



if ( $(window).width() > 820) {

}
else {

	let opened = false;
	$(".burger").click(function () { 
		   if(opened == false) {
			$("body").addClass("body-active");
			opened = true;
		   } else{
			$("body").removeClass("body-active");
			opened = false;
		
			
		   }

	
	
	
	});
	
}


$(".container__card").mouseenter(function () { 
	$(this).addClass("container__card-active");

});

$(".container__card").mouseleave(function () { 
	$(this).removeClass("container__card-active");

});


$(".header__logo").click(function () { 
	location.href = "../../index.html";

});




$( ".section__button" ).mouseenter(function() {
	$(".section__button").removeClass("section__button-non");
	$(".section__button").addClass("section__button-active");
});

$(".section__button").mouseleave(function() {
	$(".section__button").addClass("section__button-non");
	$(".section__button").removeClass("section__button-active");
});




  



let opened = false;

$('.burger').click(function() {
   if(opened == false) {
	$(".contact__box1").addClass("contact__box-active");
	setTimeout(() => {
		$(".contact__box2").addClass("contact2__box-active");
	}, 200)
	setTimeout(() => {
		$(".sociable__box").addClass("sociable__box-active");
	}, 400)



	$(".contact__menu").removeClass("contact__menu-non");
	$(".burger").addClass("burger__active");
	$(".contact__menu").addClass("contact__menu-active");
	$("[data-fs-scroll] .page.vertical").removeClass("activesii");


	   opened = true;
   } else{
	   $(".burger").removeClass("burger__active");
	   $(".contact__box2").removeClass("contact2__box-active");
	   $(".sociable__box").removeClass("sociable__box-active");

	   $(".contact__menu").addClass("contact__menu-non");
	   $(".contact__menu").removeClass("contact__menu-active");
	   $("[data-fs-scroll] .page.vertical").addClass("activesii");
	   $(".contact__box1").removeClass("contact__box-active");



	   opened = false
   }
});
