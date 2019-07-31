//testing adding price


var itemCount = 0;
var totalSum = 0;

$('.tocart').on('click', function () {
    var cart = $('.cart');
    var imgtodrag = $(this).parent('.item').find("img").eq(0);

    //  adding num icon to cart
    itemCount ++;
    $('#itemCount').text(itemCount).css('display', 'block');

    //$(this).siblings().clone().appendTo('#cartItems').append('<button class="removeItem">Remove Item</button>');
    // $('.infoforcart').clone().appendTo('#cartItems').append('<button class="removeItem">Remove Item</button>');

    var price = parseFloat($(this).siblings().find('.price').text());
    

    totalSum+= price;
    $('#cartTotal').text("Total: $" + totalSum);

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
    // clearing input for quantity after adding to cart
    var input = $('#modifyingChanges');
    input.val(parseFloat(input.val()) * 0);

    if(input.val() == 0){
        document.getElementsByClassName("tocart").readOnly = true;
    }
});

$('#modifyingChanges_Add').on('click', function(){
    var input = $('#modifyingChanges');
    input.val(parseFloat(input.val())+1);
})

$('#modifyingChanges_Minus').on('click', function(){
    var input = $('#modifyingChanges');
    if(input.val() > 0) {
        input.val(parseFloat(input.val())-1);
    }else{
        input.val(parseFloat(input.val()) = 0);
    }
})

document.getElementById("modifyingChanges").readOnly = true;


$('.cart').click(function(){
    $('#shoppingCart').toggle();
});

// for closing cart, going back to selection
$('.back').click(function(){
    $('#shoppingCart').toggle();
});

// Testing to remove item from court


$('#shoppingCart').on('click', '.removeItem', function()
{
    $(this).parent().remove();
    itemCount --;
    $('#itemCount').text(itemCount);

    var price = parseFloat($(this).siblings().find('.price').text());
    totalSum -= price;
    $('#cartTotal').text("Total: $" + totalSum);
    
    if(itemCount == 0){
        $('#itemCount').css('display', 'none');
    }
});


/*
$('.openCart').click(function(){
    $('#shoppingCart').toggle();
});
*/