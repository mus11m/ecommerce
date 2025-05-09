(function ($) {
    "use strict";

    $(document).ready(function () {
        // Only initialize if on product detail page
        if ($('#product-main-img').length) {
            initProductImageGallery();
            initProductZoom();
            initProductTabs();
            initRelatedProducts();
        }

        // Initialize quantity inputs only if they exist
        if ($('.product-quantity').length || $('.input-number').length) {
            initProductQuantity();
        }
    });

    // Initialize product image gallery
    function initProductImageGallery() {
        var mainImgSlider = $('#product-main-img');
        var thumbnailSlider = $('#product-imgs');

        if (mainImgSlider.length && thumbnailSlider.length) {
            // Initialize main product image slider
            mainImgSlider.slick({
                infinite: true,
                speed: 300,
                dots: false,
                arrows: true,
                fade: true,
                asNavFor: '#product-imgs',
            });

            // Initialize product thumbnails slider
            thumbnailSlider.slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: true,
                centerMode: true,
                focusOnSelect: true,
                centerPadding: 0,
                vertical: true,
                asNavFor: '#product-main-img',
                responsive: [{
                    breakpoint: 991,
                    settings: {
                        vertical: false,
                        arrows: false,
                        dots: true,
                    }
                }]
            });
        }
    }

    // Initialize product image zoom
    function initProductZoom() {
        var zoomMainProduct = document.getElementById('product-main-img');
        if (zoomMainProduct) {
            $('#product-main-img .product-preview').zoom();
        }
    }

    // Initialize product quantity input - Support both class naming patterns
    function initProductQuantity() {
        // First pattern: product-quantity class (from your JS file)
        var quantityInput = $('.product-quantity input[type="number"]');
        var upButton = $('.product-quantity .qty-up');
        var downButton = $('.product-quantity .qty-down');

        if (quantityInput.length) {
            // Handle quantity decrease
            downButton.on('click', function () {
                var value = parseInt(quantityInput.val()) - 1;
                value = value < 1 ? 1 : value;
                quantityInput.val(value);
                quantityInput.trigger('change');
            });

            // Handle quantity increase
            upButton.on('click', function () {
                var value = parseInt(quantityInput.val()) + 1;
                quantityInput.val(value);
                quantityInput.trigger('change');
            });

            // Update price based on quantity if needed
            quantityInput.on('change', function () {
                updateProductTotal();
            });
        }

        // Second pattern: input-number class (from your HTML)
        $('.input-number').each(function () {
            var $this = $(this),
                $input = $this.find('input[type="number"]'),
                up = $this.find('.qty-up'),
                down = $this.find('.qty-down');

            if (!$input.length) return;

            down.on('click', function () {
                var value = parseInt($input.val()) - 1;
                value = value < 1 ? 1 : value;
                $input.val(value);
                $input.change();
            });

            up.on('click', function () {
                var value = parseInt($input.val()) + 1;
                $input.val(value);
                $input.change();
            });
        });
    }

    // Update product total price based on quantity
    function updateProductTotal() {
        var quantity = parseInt($('.product-quantity input').val() || $('.input-number input').val());
        var unitPrice = parseFloat($('.product-price').data('price'));

        if (!isNaN(quantity) && !isNaN(unitPrice)) {
            var total = quantity * unitPrice;
            $('.product-total-price').text('$' + total.toFixed(2));
        }
    }

    // Initialize product information tabs
    function initProductTabs() {
        $('.product-tab-nav li').on('click', function () {
            var target = $(this).data('tab');

            // Update active tab
            $('.product-tab-nav li').removeClass('active');
            $(this).addClass('active');

            // Show target tab content
            $('.product-tab').removeClass('active');
            $(target).addClass('active');
        });
    }

    // Initialize related products slider
    function initRelatedProducts() {
        $('.related-products-slick').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            infinite: true,
            speed: 300,
            dots: false,
            arrows: true,
            responsive: [{
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }]
        });
    }

    // Handle product review submission
    $('#review-form').on('submit', function (e) {
        e.preventDefault();
        var formData = $(this).serialize();

        $.ajax({
            url: '/Product/AddReview',
            type: 'POST',
            data: formData,
            success: function (response) {
                if (response.success) {
                    // Clear form and show success message
                    $('#review-form')[0].reset();
                    $('.review-success').fadeIn().delay(3000).fadeOut();

                    // If the server returned the new review HTML, append it
                    if (response.reviewHtml) {
                        $('.product-reviews').append(response.reviewHtml);
                    }
                } else {
                    $('.review-error').text(response.message).fadeIn().delay(3000).fadeOut();
                }
            },
            error: function () {
                $('.review-error').text('Error submitting review').fadeIn().delay(3000).fadeOut();
            }
        });
    });

    // Expose AddProduct function globally for the "Add to Cart" button click
    window.AddProduct = function () {
        alert("Product Added To cart successfully");
    };

})(jQuery);