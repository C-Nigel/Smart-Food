var itemCount = 0;
var totalSum = 0;

$('.tocart').on('click', function () {
    var cart = $('.cart');
    var imgtodrag = $(this).parent('.item').find("img").eq(0);

    // trying adding num icon to cart
    itemCount ++;
    $('#itemCount').text(itemCount).css('display', 'block');
/* testing the opening cart function & total sum */

    // testing the addition of remove item button
    //$(this).siblings().clone().appendTo('#cartItems').append('<button class="removeFoodItem">Remove Item</button>');
    
    //Testing calculating total price
    var price = parseInt($(this).siblings().find('.price').text());
    // testing mutliplying quantity
    //var quantity = parseInt($(this).siblings().find('.quant').text());
    totalSum += price;
    $('#cartTotal').text("Total: $" + totalSum);
    


    /* testing disabling button */

    /*
    $(function (){
        $('#KFitem1').keyup(function (){
            if($(this).val() <= 0){
                $('.tocart').prop('disabled', true);
            }else{
                $('.tocart').prop('disabled', false);
            }
        })
    })
    */
    
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
        
        //Testing adding number icon

        /*
        function myFunction(){
        document.getElementById("tag").innerHTML += 1;
        }
        */
        /* testing jquery disabling button */
    
    
        }
    // clearing input for quantity after adding to cart
    var input = $('#KFitem1');
    input.val(parseFloat(input.val()) * 0);

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

/*
$('#btnd').on('click', function(){
    var input = $('#KFitem1');
    if(input.val() <= 0) {
        ;
    }else{
        input.val(parseFloat(input.val()) = 0);
    }
})
*/



// setting quantity to read only 
document.getElementById("KFitem1").readOnly = true;
document.getElementById("KFitem2").readOnly = true;
document.getElementById("KFitem3").readOnly = true;
document.getElementById("KFitem4").readOnly = true;
document.getElementById("KFitem5").readOnly = true;
document.getElementById("KFitem6").readOnly = true;

// TESTING GROUND FROM HERE ONWARDS


//Testing the hide and show cart items

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

    var price = parseInt($(this).siblings().find('.price').text());
    totalSum -= price;
    $('#cartTotal').text("Total: $" + totalSum);

    if(itemCount == 0){
        $('#itemCount').css('display', 'none');
    }
});


// testing the disabling of ATC btn
/*
function disableATC(KFitem1){
    var bt = document.getElementById('btnd');
    //var input = $('#KFitem1');
    var input = $('#KFitem1');
    if(input.val() > 0){
        bt.disabled = false;
    }else{
        bt.disabled = true;
    }
}
*/


// testing cart icon 

/*
$(function(){
    var goToCartIcon = function($addTocartBtn){
    var $cartIcon = $(".cart-icon");
    var $image = $('<img width="30px" height="30px" src="' + $addTocartBtn.data("image") + '"/>').css({"position": "fixed", "z-index": "999"});
    $addTocartBtn.prepend($image);
    var position = $cartIcon.position();
    $image.animate({
        top: position.top,
        left: position.left
    }, 500, "linear", function() {
        $image.remove();
    })
    }

    $('.tocart').cart({
        currencySymbol: '$',
        classCartIcon: 'cart-icon',
        classCartBadge: 'cart-badge',
        classProductQuantity: 'product-quantity',
        classProductRemove: 'product-remove',
        classCheckoutCart: 'cart-checkout',
        affixCartIcon: true,
        showCheckOutModal: true,
        numberOfDecimals: 2,
        cartItems: [
            {id: 1, name: 'product 1', summary: 'summary 1', price: 10, quantity: 1, image: '#'},
            {id: 2, name: 'product 2', summary: 'summary 2', price: 20, quantity: 2, image: '#'},
            {id: 3, name: 'product 3', summary: 'summary 3', price: 30, quantity: 1, image: '#'}
        ],
        clickOnAddToCart: function($addTocart){
            goToCartIcon($addTocart);
        },
        afterAddOnCart: function(products, totalPrice, totalQuantity){
            console.log("afterAddOnCart", products, totalPrice, totalQuantity);
        },
        clickOnCartIcon: function($cartIcon, products, totalPrice, totalQuantity){
            console.log("cart icon clicked", $cartIcon, products, totalPrice, totalQuantity);
        },
        checkoutCart: function(products, totalPrice, totalQuantity){
            var checkoutString = "Total price: " + totalPrice + "\nTotal Quantity: " + totalQuantity;
            checkoutString += "\n\n id \t name \t summary \t price \t quantity \t image.path";
            $.each(products, function(){
                checkoutString += ("\n " + this.id + " \t " + this.name + " \t " + this.summary + " \t " + this.image);
            });
            alert(checkoutString)
            console.log("checking out", products, totalPrice, totalQuantity);
        }
    });

    $("#addNewProduct").click(function(event){
        var currentElementNo = $(".row").children().length + 1;
        $(".row").append(
            '<div class="col-md-3 text-center"><img src="#" width="150px" height="150px"><br>product ' 
            + currentElementNo + ' - <strong>$' 
            + currentElementNo + '</strong><br><button class="btn btn-danger tocart" data-id="' 
            + currentElementNo + '" data-name="product ' + currentElementNo 
            + '" data-summary="summary ' + currentElementNo 
            + '" data-price="' + currentElementNo 
            + '" data-quantity="1" data-image="#">Add to Cart</button><a href="#" class="btn btn-info">Details</a></div>')
    })
})
*/


