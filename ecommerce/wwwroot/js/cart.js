(function ($) {
    "use strict";

    $(document).ready(function () {
        // Only initialize if on cart-related pages
        if ($('.add-to-cart-btn').length || $('#checkout-form').length) {
            initCartActions();
            initCheckoutForm();
        }
    });

    // Initialize cart-related actions
    function initCartActions() {
        // Add to cart button clicks
        $('.add-to-cart-btn').on('click', function (e) {
            // Only prevent default if it's not already handled by the link
            if (!$(this).closest('a').length) {
                e.preventDefault();
                addToCart($(this).data('product-id'));
            }
        });

        // Remove from cart button clicks
        $('.cart-list .delete').on('click', function (e) {
            e.preventDefault();
            var productId = $(this).closest('.product-widget').data('id');
            removeFromCart(productId);
        });

        // Update quantity in cart
        $('.cart-qty-input').on('change', function () {
            var productId = $(this).data('product-id');
            var quantity = $(this).val();
            updateCartQuantity(productId, quantity);
        });
    }

    // Add item to cart via AJAX
    function addToCart(productId) {
        $.ajax({
            url: '/Cart/AddToCart',
            type: 'POST',
            data: { id: productId },
            success: function (response) {
                if (response.success) {
                    // Show success message
                    alert("Product added to cart successfully.");

                    // Update cart quantity indicator if it exists
                    if ($('.cart-qty').length) {
                        $('.cart-qty').text(response.cartItemsCount);
                    }
                } else {
                    alert(response.message || "Error adding product to cart");
                }
            },
            error: function () {
                alert("Error adding product to cart");
            }
        });
    }

    // Remove item from cart
    function removeFromCart(productId) {
        $.ajax({
            url: '/CartItem/Delete',
            type: 'POST',
            data: { id: productId },
            success: function (response) {
                if (response.success) {
                    // Remove item from DOM
                    $('[data-id="' + productId + '"]').fadeOut(300, function () {
                        $(this).remove();

                        // Update totals
                        updateCartTotals();
                    });
                } else {
                    alert(response.message || "Error removing item from cart");
                }
            },
            error: function () {
                alert("Error removing item from cart");
            }
        });
    }

    // Update cart quantity
    function updateCartQuantity(productId, quantity) {
        $.ajax({
            url: '/CartItem/Update',
            type: 'POST',
            data: { id: productId, quantity: quantity },
            success: function (response) {
                if (response.success) {
                    // Update price display
                    updateCartTotals();
                } else {
                    alert(response.message || "Error updating cart");
                }
            },
            error: function () {
                alert("Error updating cart");
            }
        });
    }

    // Update cart totals (subtotal, tax, total)
    function updateCartTotals() {
        $.ajax({
            url: '/Cart/GetCartTotals',
            type: 'GET',
            success: function (response) {
                // Update displayed totals
                $('.cart-summary-subtotal').text(response.subtotal);
                $('.cart-summary-total').text(response.total);
                $('.cart-items-count').text(response.itemCount);
            },
            error: function () {
                console.error("Error updating cart totals");
            }
        });
    }

    // Initialize checkout form validation
    function initCheckoutForm() {
        $('#checkout-form').on('submit', function (e) {
            var isValid = validateCheckoutForm();
            if (!isValid) {
                e.preventDefault();
            }
        });
    }

    // Validate checkout form
    function validateCheckoutForm() {
        var isValid = true;

        // Simple validation example - expand as needed
        $('#checkout-form input[required]').each(function () {
            if (!$(this).val().trim()) {
                isValid = false;
                $(this).addClass('input-error').closest('.form-group').addClass('has-error');
            } else {
                $(this).removeClass('input-error').closest('.form-group').removeClass('has-error');
            }
        });

        return isValid;
    }

})(jQuery);