(function ($) {
    "use strict";

    $(document).ready(function () {
        // Only initialize on product listing pages
        if ($('#price-slider').length) {
            initPriceSlider();
            initQuantityInputs();
        }

        if ($('#filter-form').length) {
            $('#filter-form').on('submit', function (e) {
                e.preventDefault();
                applyFilters();
            });

            $('.filter-input').on('change', function () {
                applyFilters();
            });
        }
    });

    // Initialize price range slider
    function initPriceSlider() {
        var priceSlider = document.getElementById('price-slider');
        var priceInputMax = document.getElementById('price-max');
        var priceInputMin = document.getElementById('price-min');

        // Only initialize price slider if all required elements exist
        if (priceSlider && priceInputMax && priceInputMin) {
            // Add event listeners
            priceInputMax.addEventListener('change', function () {
                updatePriceSlider($(this).parent(), this.value);
            });

            priceInputMin.addEventListener('change', function () {
                updatePriceSlider($(this).parent(), this.value);
            });

            // Initialize noUiSlider
            noUiSlider.create(priceSlider, {
                start: [10, 100000],
                connect: true,
                step: 10,
                range: {
                    'min': 10,
                    'max': 100000
                }
            });

            // Update price inputs when slider changes
            priceSlider.noUiSlider.on('update', function (values, handle) {
                var value = values[handle];
                if (handle) {
                    priceInputMax.value = value;
                } else {
                    priceInputMin.value = value;
                }
            });
        }
    }

    // Update price slider from input changes
    function updatePriceSlider(elem, value) {
        var priceSlider = document.getElementById('price-slider');

        if (!priceSlider || !priceSlider.noUiSlider) return;

        if (elem.hasClass('price-min')) {
            console.log('min price updated to: ' + value);
            priceSlider.noUiSlider.set([value, null]);
        } else if (elem.hasClass('price-max')) {
            console.log('max price updated to: ' + value);
            priceSlider.noUiSlider.set([null, value]);
        }
    }

    // Initialize quantity input controls
    function initQuantityInputs() {
        $('.input-number').each(function () {
            var $this = $(this),
                $input = $this.find('input[type="number"]'),
                up = $this.find('.qty-up'),
                down = $this.find('.qty-down');

            down.on('click', function () {
                var value = parseInt($input.val()) - 1;
                value = value < 1 ? 1 : value;
                $input.val(value);
                $input.change();
                updatePriceSlider($this, value);
            });

            up.on('click', function () {
                var value = parseInt($input.val()) + 1;
                $input.val(value);
                $input.change();
                updatePriceSlider($this, value);
            });
        });
    }

    // Apply filters and update product list
    function applyFilters() {
        var formData = $('#filter-form').serialize();
        var url = $('#filter-form').attr('action');

        // Show loading indicator if it exists
        $('.filter-loading').fadeIn(200);

        // AJAX request to get filtered products
        $.ajax({
            url: url,
            type: 'GET',
            data: formData,
            success: function (response) {
                // Update product container with filtered results
                $('#products-container').html(response);
            },
            error: function (xhr) {
                console.error('Error applying filters', xhr);
            },
            complete: function () {
                // Hide loading indicator
                $('.filter-loading').fadeOut(200);
            }
        });
    }

})(jQuery);