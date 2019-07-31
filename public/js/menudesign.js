var selectedItemCounter = 0;
var totalPrice = 0;

$('.tocart').on('click', function(){
    var myCart = $('.cart');
    var imgtodrag = $(this).find('img').eq(0);
    selectedItemCounter ++;
    $('#selectedItemCounter').text(selectedItemCounter).css('display', 'block');
    var itemPrice = parseFloat($(this).siblings().find('.price').text());
    totalPrice+=itemPrice;
    $('#cartTotal').text("Total: $"+ totalPrice);

    if(imgtodrag){
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
            'top': myCart.offset().top + 10,
            'left': myCart.offset().left + 10,
            'width': 75,
            'height': 75
        }, 1000, 'easeInOutExpo');
        setTimeout(function (){
            myCart.effect("shake", {
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
    var inputQuantity = $('#modifyingChanges');
    inputQuantity.val(parseFloat(inputQuantity.val()) * 0);
});


$('.selection').on('click', function(){
    $('#modification').toggle();
})

$('.back').click(function(){
    $('#modification').toggle();
})

$('#modifyingChanges_Minus').on('click', function(){
    var inputQuantity = $('#modifyingChanges');
    if(inputQuantity.val()>0){
        inputQuantity.val(parseFloat(inputQuantity.val()) - 1);
    }else{
        inputQuantity.val(parseFloat(inputQuantity.val()) = 0);
    }
})

$('#modifyingChanges_Add').on('click', function(){
    var inputQuantity = $('#modifyingChanges');
    inputQuantity.val(parseFloat(inputQuantity.val()) + 1);
})

document.getElementById("modifyingChanges").readOnly = true;


$('.cart').on('click', function(){
    $('#shoppingCart').toggle();
})

$('.return').on('click', function(){
    $('#shoppingCart').toggle();
});

// $('#shoppingCart').on('click', '.removeItem', function()
// {
//     $(this).parent().remove();
//     selectedItemCounter --;
//     $('#selectedItemCounter').text(selectedItemCounter);

//     var itemPrice = parseFloat($(this).siblings().find('.card-subtitle mb-2 itemPrice').text());
//     totalPrice -= itemPrice;
//     $('#cartTotal').text("Total: $" + totalPrice);

//     if(selectedItemCounter == 0){
//         $('#selectedItemCounter').css('display', 'none');
//     }
// });
