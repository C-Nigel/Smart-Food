$('.tocart').on('click', function () {
    var cart = $('.cart');
    var imgtodrag = $(this).parent('.item').find("img").eq(0);
    if (imgtodrag) {
        var imgclone = imgtodrag.clone()
            .offset({
                top: imgtodrag.offset().top,
                left: imgtodrag.offset().left
        })
            .css({
            'opacity': '0.5',
                'position': 'absolute',
                'height': '150px',
                'width': '150px',
                'z-index': '100'
            })
        .appendTo($('body'))
        .animate({
            'top': cart.offset().top + 10,
            'left': cart.offset().left + 10,
            'width': 75,
            'height': 75
        }, 1000, 'easeInOutExpo');

        setTimeout(function (){
            cart.effect("shake", {
                times: 2
            }, 200);
        }, 1500);

        imgclone.animate({
            'width': 0,
            'height': 0
        }, function (){
            $(this).detach()
        });
    }
});


$('#KFitem1_add').on('click', function(){
    var input = $('#KFitem1');
    input.val(parseFloat(input.val())+1);
})

$('#KFitem1_minus').on('click', function(){
    var input = $('#KFitem1');
    if(input.val() > 0) {
        input.val(parseFloat(input.val())-1);
    }else{
        input.val(parseFloat(input.val()) = 0);
    }
})


$('#KFitem2_add').on('click', function(){
    var input = $('#KFitem2');
    input.val(parseFloat(input.val())+1);
})

$('#KFitem2_minus').on('click', function(){
    var input = $('#KFitem2');
    if(input.val() > 0) {
        input.val(parseFloat(input.val())-1);
    }else{
        input.val(parseFloat(input.val()) = 0);
    }
})

$('#KFitem3_add').on('click', function(){
    var input = $('#KFitem3');
    input.val(parseFloat(input.val())+1);
})

$('#KFitem3_minus').on('click', function(){
    var input = $('#KFitem3');
    if(input.val() > 0) {
        input.val(parseFloat(input.val())-1);
    }else{
        input.val(parseFloat(input.val()) = 0);
    }
})

$('#KFitem4_add').on('click', function(){
    var input = $('#KFitem4');
    input.val(parseFloat(input.val())+1);
})

$('#KFitem4_minus').on('click', function(){
    var input = $('#KFitem4');
    if(input.val() > 0) {
        input.val(parseFloat(input.val())-1);
    }else{
        input.val(parseFloat(input.val()) = 0);
    }
})

$('#KFitem5_add').on('click', function(){
    var input = $('#KFitem5');
    input.val(parseFloat(input.val())+1);
})

$('#KFitem5_minus').on('click', function(){
    var input = $('#KFitem5');
    if(input.val() > 0) {
        input.val(parseFloat(input.val())-1);
    }else{
        input.val(parseFloat(input.val()) = 0);
    }
})

$('#KFitem6_add').on('click', function(){
    var input = $('#KFitem6');
    input.val(parseFloat(input.val())+1);
})

$('#KFitem6_minus').on('click', function(){
    var input = $('#KFitem6');
    if(input.val() > 0) {
        input.val(parseFloat(input.val())-1);
    }else{
        input.val(parseFloat(input.val()) = 0);
    }
})
