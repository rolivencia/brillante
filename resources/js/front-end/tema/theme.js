$('.heroImage .owl-carousel').owlCarousel({
    loop:true,
    margin:10,
	items: 1,
    nav:false
});
$('.productsCarousel .owl-carousel').owlCarousel({
    loop:true,
    margin:0,
    nav:true,
	dots: false,
    responsive:{
        0:{
            items:1,
			nav:false,
			stagePadding: 40
        },
		400:{
			nav:false,
            items:1,
			margin:10,
        },
        768:{
			nav:true,
            items:3
        },
        1000:{
            items:3
        }
    }
});
if($('#MainMenu_OpenBtn').length > 0){
	$('#MainMenu_OpenBtn').click(function(){

		if($('#MainMenu').hasClass('in')){
			$('#MainMenu').addClass('out');
			 setTimeout(function(){
				$('#MainMenu').removeClass('in');
				$('#MainMenu').removeClass('out');
			},500);
		}else{
			$('#MainMenu').addClass('in');
			$('#MainMenu_MenuContainer').height($(window).height()-$('#MainHeader').height()-1);
		}
		
    }); 
	$('#MainMenu').on('click', '#MainMenu_CloseBtn, #MainMenu_overlay', function(){
		$('#MainMenu').addClass('out');
        setTimeout(function(){
			$('#MainMenu').removeClass('in');
			$('#MainMenu').removeClass('out');
		},500);
		
    });
	
}
if($('#SearchMenu_OpenBtn').length > 0){
	$('#SearchMenu_OpenBtn').click(function(){
		$('#SearchMenu_MenusContainer').height($(window).height()-$('#MainHeader').height());
        $('#SearchMenu').addClass('in');
		$('#SearchMenu .buscador .form-control').focus();
		
    }); 
	$('#SearchMenu').on('click', '#SearchMenu_CloseBtn, #SearchMenu_overlay', function(){
		$('#SearchMenu').addClass('out');
        setTimeout(function(){
			$('#SearchMenu').removeClass('in');
			$('#SearchMenu').removeClass('out');
		},500)
		
    });
}
if($('#NewUserMenu_OpenBtn').length > 0){
	$('#NewUserMenu_OpenBtn').click(function(){
		$('#NewUserMenu_MenusContainer').height($(window).height()-$('#').height());
        $('#NewUserMenu').addClass('in');
		
    }); 
	$('#NewUserMenu').on('click', '#NewUserMenu_CloseBtn, #NewUserMenu_overlay', function(){
		$('#NewUserMenu').addClass('out');
        setTimeout(function(){
			$('#NewUserMenu').removeClass('in');
			$('#NewUserMenu').removeClass('out');
		},500);
		
    });
}
if($(window).width() < 576){
	$('#MainMenu_MenuContainer').height($(window).height()-$('#MainHeader').height()-1);
}
$( window ).resize(function() {
	if($(window).width() < 576){
		if($('#MainMenu').hasClass('in')){
			$('#MainMenu_MenuContainer').height($(window).height()-$('#MainHeader').height()-1);
		}
		if($('#SearchMenu').hasClass('in')){
			$('#SearchMenu_MenusContainer').height($(window).height()-$('#MainHeader').height());
		}
		if($('#NewUserMenu').hasClass('in')){
			$('NewUserMenu_MenusContainer').height($(window).height()-$('#MainHeader').height());
		}
	}else{
		$('#MainMenu').removeClass('in');
		$('#SearchMenu').removeClass('in');
		$('#NewUserMenu').removeClass('in');
		$('#MainMenu_MenuContainer').removeAttr('style');
		$('#SearchMenu_MenusContainer').removeAttr('style');
		$('#NewUserMenu_MenusContainer').removeAttr('style');
	}
});