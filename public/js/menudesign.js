// const orders = require('./class/order_class');



$('.back').click(function(){
    $('.modification').toggle();
})


$('.cart').on('click', function(){
    $('#shoppingCart').toggle();
})

$('.return').on('click', function(){
    $('#shoppingCart').toggle();
});

var selectedItemCounter = 0;
var totalPrice = 0;
var orders = [];


// adding prices for each item 
$('.tocart').on('click', function(){
    var cart = $('.cart');
    var imgtodrag = $(this).parent('.eachItem').find("img").eq(0);
    selectedItemCounter ++ ;
    $('#selectedItemCounter').text(selectedItemCounter).css('display', 'block');
    
    // $(this).parent('.eachItem').clone().appendTo('#cartItems').append('<button class="btn btn-primary removeItem">Remove Item</button>');
    //var price = parseFloat($(this).parent('.clonestuff').find('#price').text());
    // var price = document.getElementById('price').innerHTML;
    // $(this).parent('.eachItem').clone().appendTo('#cartItems').append('<button class="btn btn-primary removeItem">Remove Item</button>');
    $(this).siblings('#clonestuff').clone().appendTo('#cartItems').append('<button class="btn btn-primary removeItem">Remove Item</button>');
    var price = parseFloat($(this).siblings().find('#price').text());

    totalPrice += price;
    // $('#cartTotal').text("Total: $" + parseFloat(totalPrice));
    $('#cartTotal').text("Total: $" + totalPrice.toFixed(2));

    var itemid = $(this).siblings().find('#itemid');
    orders.push($('#itemid').val());
    // orders.push($('#itemid').val());
    

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

// removing items in cart
$('#shoppingCart').on('click', '.removeItem', function(){
    $(this).parent().remove();
    selectedItemCounter--;
    $('#selectedItemCounter').text(selectedItemCounter);

    //var price = parseFloat($(this).siblings().find('.price').text());
    //var price = parseFloat($('.eachItem > #clonestuff').find('span'), $('span', $('#clonestuff'))); //works if remove clonestuff class
    // var price = parseFloat($(this).parent('.clonestuff').find("#price").text());

    $(this).siblings('#clonestuff').clone().appendTo('#cartItems').append('<button class="btn btn-primary removeItem">Remove Item</button>');
    var price = parseFloat($(this).siblings().find('#price').text());


    totalPrice -= price;
    $('#cartTotal').text("Total: $" + totalPrice.toFixed(2));
    
    if(selectedItemCounter == 0){
        $('#selectedItemCounter').css('display', 'none');
    }

    // orders.pop($('#itemid').val());
});


// not used anymore
// $('#modifyingChanges_Add').on('click', function(){
//     var input = $('#modifyingChanges');
//     input.val(parseFloat(input.val())+1);
// })

// $('#modifyingChanges_Minus').on('click', function(){
//     var input = $('#modifyingChanges');
//     if(input.val() > 0) {
//         input.val(parseFloat(input.val())-1);
//     }else{
//         input.val(parseFloat(input.val()) = 0);
//     }
// })



// // not working, only print out the first 
$('.submitOrders').on('click', function(){
    var admin = $('#adminNo').val();
    for (var i=0; i<orders.length; i++){
        $.ajax({
            url: '/menu/menu-order/' + admin + '/' + orders[i],
            type: 'POST'
        })
    console.log(orders[i]);
    }
})




// $('.emptyCart').on('click', function(){
//     var admin = $('#adminNo').val();
//     for(var i=0; i<orders.length; i++){
//         url: '/menu/menu-order' + admin + '/' + orders[i],
//         type
//     }
// })

