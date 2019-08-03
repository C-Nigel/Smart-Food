// import { Message } from "twilio/lib/twiml/MessagingResponse";

// const orders = require('./class/order_class');
// const Order = require('../models/Order');


// $('.back').click(function(){
//     $('.modification').toggle();
// })


$('.cart').on('click', function(){
    $('#shoppingCart').toggle();
})

$('.return').on('click', function(){
    $('#shoppingCart').toggle();
});

var count = -1;
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

    // $('.row > div').on('click', function() {
    //     var val = $('input[id^="itemid_"]', this).val();
    //     // var val = $(this).siblings().find('#itemid_', this).val();
    //     alert(val);
    //     orders.push(val);
    // });
    
    

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

    $(this).siblings('#clonestuff').clone().appendTo('#cartItems').append('<button class="btn btn-primary" id="removeItem_{{id}}" value="{{id}}">Remove Item</button>');
    var price = parseFloat($(this).siblings().find('#price').text());


    totalPrice -= price;
    $('#cartTotal').text("Total: $" + totalPrice.toFixed(2));
    
    if(selectedItemCounter == 0){
        $('#selectedItemCounter').css('display', 'none');
    }

    // orders.pop($('#itemid').val());
});

// adding items to database when orders are submitted

$('.row > #infoforcart > .eachItem').on('click', function() {
    var val = $('input[id^="itemid_"]', this).val();
    // var val = $(this).siblings().find('#itemid_', this).val();
    alert(val);
    orders.push(val);
});


// // now print in a wrong manner
$('.submitOrders').on('click', function(){
    var admin = $('#adminNo').val();
    if(confirm("Do you want to submit your order(Action is irreversible!)? ")){
        for (var i=0; i<orders.length; i++){
            $.ajax({
                url: '/menu/menu-order/' + admin + '/' + orders[i],
                type: 'POST'
            })
            console.log(orders[i]);
        }    
    }else{
        // do nothing
    }
});


//trying to identify the position of the item that user wan to remove
// after pressing removing btn

var child = document.getElementById('#cartItems');
var parent = child.parentNode;


// $('#cartItem > .removeItem').on('click', function(){
//     var deleteitem = $('input[id="itemid_"]', this).val();
//     alert(deleteitem);
//     orders.eq(deleteitem).remove();
//     Order.destroy({
//         where: {deleteitem: item_id }
//     });
//     console.log(orders);
//     alert('Deleted selected food items');
// });
