// for the favourite button
$('.favme').click(function(){
    $(this).toggleClass('active');
});

//toggles animation
$(".favme").on('click touchstart', function(){
    $(this).toggleClass('is_animating');
});

