//(function ($) {
//	"use strict"

//	// Mobile Nav toggle
//	$('.menu-toggle > a').on('click', function (e) {
//		e.preventDefault();
//		$('#responsive-nav').toggleClass('active');
//	})

//	// Fix cart dropdown from closing
//	$('.cart-dropdown').on('click', function (e) {
//		e.stopPropagation();
//	});

//	/////////////////////////////////////////

//	// Products Slick
//	$('.products-slick').each(function () {
//		var $this = $(this),
//			$nav = $this.attr('data-nav');

//		$this.slick({
//			slidesToShow: 4,
//			slidesToScroll: 1,
//			autoplay: true,
//			infinite: true,
//			speed: 300,
//			dots: false,
//			arrows: true,
//			appendArrows: $nav ? $nav : false,
//			responsive: [{
//				breakpoint: 991,
//				settings: {
//					slidesToShow: 2,
//					slidesToScroll: 1,
//				}
//			},
//			{
//				breakpoint: 480,
//				settings: {
//					slidesToShow: 1,
//					slidesToScroll: 1,
//				}
//			},
//			]
//		});
//	});

//	// Products Widget Slick
//	$('.products-widget-slick').each(function () {
//		var $this = $(this),
//			$nav = $this.attr('data-nav');

//		$this.slick({
//			infinite: true,
//			autoplay: true,
//			speed: 300,
//			dots: false,
//			arrows: true,
//			appendArrows: $nav ? $nav : false,
//		});
//	});

//	/////////////////////////////////////////

//	// Product Main img Slick
//	$('#product-main-img').slick({
//		infinite: true,
//		speed: 300,
//		dots: false,
//		arrows: true,
//		fade: true,
//		asNavFor: '#product-imgs',
//	});

//	// Product imgs Slick
//	$('#product-imgs').slick({
//		slidesToShow: 3,
//		slidesToScroll: 1,
//		arrows: true,
//		centerMode: true,
//		focusOnSelect: true,
//		centerPadding: 0,
//		vertical: true,
//		asNavFor: '#product-main-img',
//		responsive: [{
//			breakpoint: 991,
//			settings: {
//				vertical: false,
//				arrows: false,
//				dots: true,
//			}
//		},
//		]
//	});

//	// Product img zoom
//	var zoomMainProduct = document.getElementById('product-main-img');
//	if (zoomMainProduct) {
//		$('#product-main-img .product-preview').zoom();
//	}

//	/////////////////////////////////////////

//	// Input number
//	$('.input-number').each(function () {
//		var $this = $(this),
//			$input = $this.find('input[type="number"]'),
//			up = $this.find('.qty-up'),
//			down = $this.find('.qty-down');

//		down.on('click', function () {
//			var value = parseInt($input.val()) - 1;
//			value = value < 1 ? 1 : value;
//			$input.val(value);
//			$input.change();
//			updatePriceSlider($this, value)
//		})

//		up.on('click', function () {
//			var value = parseInt($input.val()) + 1;
//			$input.val(value);
//			$input.change();
//			updatePriceSlider($this, value)
//		})
//	});

//	var priceInputMax = document.getElementById('price-max'),
//		priceInputMin = document.getElementById('price-min');

//	// Add null checks for price inputs
//	if (priceInputMax) {
//		priceInputMax.addEventListener('change', function () {
//			updatePriceSlider($(this).parent(), this.value)
//		});
//	}

//	if (priceInputMin) {
//		priceInputMin.addEventListener('change', function () {
//			updatePriceSlider($(this).parent(), this.value)
//		});
//	}

//	function updatePriceSlider(elem, value) {
//		if (elem.hasClass('price-min')) {
//			console.log('min')
//			priceSlider.noUiSlider.set([value, null]);
//		} else if (elem.hasClass('price-max')) {
//			console.log('max')
//			priceSlider.noUiSlider.set([null, value]);
//		}
//	}

//	// Price Slider
//	// Price Slider
//	var priceSlider = document.getElementById('price-slider');
//	if (priceSlider) {
//		noUiSlider.create(priceSlider, {
//			start: [10, 100000],
//			connect: true,
//			step: 10,
//			range: {
//				'min': 10,
//				'max': 100000
//			}
//		});

//		priceSlider.noUiSlider.on('update', function (values, handle) {
//			var value = values[handle];
//			if (handle && priceInputMax) {
//				priceInputMax.value = value;
//			} else if (!handle && priceInputMin) {
//				priceInputMin.value = value;
//			}
//		});
//	}

//})(jQuery);


(function ($) {
    "use strict";

    // Modern jQuery ready handler
    $(function () {
        // Mobile menu toggle
        $('.menu-toggle').on('click', function (e) {
            e.preventDefault();
            $('#responsive-nav').toggleClass('active');
        });

        // Fix cart dropdown from closing
        $('.cart-dropdown').on('click', function (e) {
            e.stopPropagation();
        });

        // Products Slick Carousel (common to multiple pages)
        initProductCarousels();

        // Initialize product widgets carousels
        initProductWidgetCarousels();
    });

    // Initialize product listing carousels
    function initProductCarousels() {
        $('.products-slick').each(function () {
            var $this = $(this),
                $nav = $this.attr('data-nav');

            $this.slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                autoplay: true,
                infinite: true,
                speed: 300,
                dots: false,
                arrows: true,
                appendArrows: $nav ? $nav : false,
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
        });
    }

    // Initialize product widget carousels
    function initProductWidgetCarousels() {
        $('.products-widget-slick').each(function () {
            var $this = $(this),
                $nav = $this.attr('data-nav');

            $this.slick({
                infinite: true,
                autoplay: true,
                speed: 300,
                dots: false,
                arrows: true,
                appendArrows: $nav ? $nav : false,
            });
        });
    }

    // Global functions that might be needed across multiple components
    window.formatCurrency = function (amount) {
        return '$' + parseFloat(amount).toFixed(2);
    };

})(jQuery);