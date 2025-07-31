(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }


    // Smooth scrolling to section
    $(".btn-scroll").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 0
            }, 1500, 'easeInOutExpo');
        }
    });
    
    
    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        items: 1
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
})(jQuery);


document.addEventListener('DOMContentLoaded', () => {
    const phpCodeTextarea = document.getElementById('phpCode');
    const runCodeButton = document.getElementById('runCode');
    const phpOutputPre = document.getElementById('phpOutput');
    const consoleOutputPre = document.getElementById('consoleOutput');

    // --- PHP code to be automatically typed ---
    const initialPhpCode = `<?php
echo "Hello, This is Ahmed Rasidun Bari Dip";
echo "Thank you for visiting my profile!";
echo "Have a great day!";
?>`;

    // Set the initial value of the textarea
    phpCodeTextarea.value = initialPhpCode;

    runCodeButton.addEventListener('click', () => {
        const code = phpCodeTextarea.value;

        // --- Simulate PHP Output ---
        let simulatedPhpOutput = '';

        // Simple regex to find 'echo' statements and extract their content
        const echoRegex = /echo\s*(['"])(.*?)\1\s*;/g; // Improved regex to handle single/double quotes
        let match;
        while ((match = echoRegex.exec(code)) !== null) {
            simulatedPhpOutput += match[2] + '\n'; // Use match[2] for the captured group
        }

        phpOutputPre.textContent = simulatedPhpOutput || 'No PHP output to display.';

        // --- Simulate Console Output (using JavaScript's console for example) ---
        let fakeConsoleOutput = '';
        const consoleLogRegex = /console\.log\s*\(([^)]*)\);/g;
        let consoleMatch;
        while ((consoleMatch = consoleLogRegex.exec(code)) !== null) {
            try {
                let evalResult = eval(consoleMatch[1]);
                fakeConsoleOutput += (typeof evalResult === 'string' ? evalResult : JSON.stringify(evalResult)) + '\n';
            } catch (e) {
                fakeConsoleOutput += `Error evaluating console.log: ${e.message}\n`;
            }
        }

        // Add some predefined fake console messages
        fakeConsoleOutput += "INFO: Editor initialized.\n";
        fakeConsoleOutput += "DEBUG: Processing user input...\n";
        fakeConsoleOutput += "SUCCESS: Code simulation complete.\n";

        consoleOutputPre.textContent = fakeConsoleOutput;
    });

    // Initial run to populate outputs with the simulated code's result
    runCodeButton.click();
});
