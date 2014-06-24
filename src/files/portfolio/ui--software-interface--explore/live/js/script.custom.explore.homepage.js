(function($) {

    // Remove Padding From Iframe's Parent Block and Set Correct Width
    $('#template-content', parent.document).css({ 'padding': '0', 'width': '100%' });

    /** jQuery *Document* Ready
    ************************************************************/
    $(document).ready(function() {

        /** Carousel Headers & Nav Interaction */

        // Bootstrap Carousel initialization and settings
        $('#carousel').carousel({
            interval: false,
            pause: false,
            wrap: false
        });

        // Ties Carousel and Navigation together. Navigation Tab must be fired
        // to change Carousel slide ('Page' Header)
        $('#primary-nav a[data-toggle=tab]').on('show.bs.tab', function(e) {
            var i = $(e.target).parent().index();
            $('#carousel').carousel(i);
        });

        /** Preserve User Activity via Cookies
         *  Note: Must include 'cookie.js' (https://github.com/js-coder/cookie.js)
         *  => '1' = On
         *  => '0' = Off
         */
       
        // Set Cookie.js default Expiration date to 10 years
        cookie.defaults.expires = 3650;

        // Common variables
        var splitter = '-';

        // Functions
        function setCookie(cookieName, whichArray) {
            var cookieValue = whichArray.join(splitter);
            cookie.set(cookieName, cookieValue);
        }

        /* Get Started page
         * @cookie name: 'get-started'
         * @var name: getStarted, getStartedArr
         */
        
        var getStartedArr = [], getStarted;

        // IF cookie does not exist (i.e. first time user), set initial values
        if (cookie.get('get-started', 'empty') == 'empty') {

            // Array -> String -> Set Cookie
            getStartedArr[0] = '1'; // Step 1
            getStartedArr[1] = '1'; // Step 2
            getStartedArr[2] = '1'; // Step 3

            setCookie('get-started', getStartedArr);

        }

        // ELSE cookie does exist (i.e. second+ time user), get cookie
        else {
            
            // Get Cookie (String) -> Array
            getStarted = cookie.get('get-started');
            getStartedArr = getStarted.split(splitter);

        }

        /* Settings
         * @cookie name: 'settings'
         * @var name: settings, settingsArr
         */
        
        var settingsArr = [], settings;

        // IF cookie does not exist (i.e. first time user), set initial values
        if (cookie.get('settings', 'empty') == 'empty') {

            settingsArr[0] = '1'; // Menu Rollover Information
            settingsArr[1] = '1'; // Profile Headshot on Home Tab

            setCookie('settings', settingsArr);

        } else {

            // ELSE cookie does exist (i.e. second+ time user), get cookie
            settings = cookie.get('settings');
            settingsArr = settings.split(splitter);

        }

        /** User Actions
         *******************************************************/
        
        // '.nav-element' Navigation
        $('#switch-to-get-started').click(function(e) {
            $('#primary-nav a[href=#get-started]').tab('show');

            getStartedArr[0] = '1'; // Step 1
            getStartedArr[1] = '1'; // Step 2
            getStartedArr[2] = '1'; // Step 3

            setCookie('get-started', getStartedArr);

            $('#step-1 .btnColorLarge, #step-2 .btnColorLarge, #step-3 .btnColorLarge').removeClass('inactive');

            e.preventDefault();
        });

        $('#switch-to-home').click(function(e) {
            $('#primary-nav a[href=#1]').tab('show');

            getStartedArr[0] = '0'; // Step 1
            getStartedArr[1] = '0'; // Step 2
            getStartedArr[2] = '0'; // Step 3

            setCookie('get-started', getStartedArr);

            $('#step-1 .btnColorLarge, #step-2 .btnColorLarge, #step-3 .btnColorLarge').addClass('inactive');

            e.preventDefault();
        });
        
        // Get Started Step Button Deactivation 
        $('#step-1 .btnColorLarge').click(function() { getStartedArr[0] = '0'; setCookie('get-started', getStartedArr); $(this).addClass('inactive'); });
        $('#step-2 .btnColorLarge').click(function() { getStartedArr[1] = '0'; setCookie('get-started', getStartedArr); $(this).addClass('inactive'); });
        $('#step-3 .btnColorLarge').click(function() { getStartedArr[2] = '0'; setCookie('get-started', getStartedArr); $(this).addClass('inactive'); });

        if (getStartedArr[0] == '0') { $('#step-1 .btnColorLarge').addClass('inactive'); }
        if (getStartedArr[1] == '0') { $('#step-2 .btnColorLarge').addClass('inactive'); }
        if (getStartedArr[2] == '0') { $('#step-3 .btnColorLarge').addClass('inactive'); }

        // Get Started -> Step 3 Button -> Show Home Tab 
        $('#step-3 a.btnColorLarge').click(function (e) {
            $('#primary-nav a[href=#1]').tab('show');
            setCookie('get-started', getStartedArr);
            e.preventDefault();
        });

        // Settings Toggles 
        $('#setting-show-menu-rollovers').change(function() {
            $('#primary-nav .tooltip').toggleClass('inactive');
            var bool = $('#primary-nav .tooltip').hasClass('inactive');
            if (bool === false) { settingsArr[0] = '1'; }
            if (bool === true) { settingsArr[0] = '0'; }
            setCookie('settings', settingsArr);
        });

        $('#setting-show-headshot').change(function() {
            $('#profile-headshot').toggleClass('inactive');
            var bool = $('#profile-headshot').hasClass('inactive');
            if (bool === false) { settingsArr[1] = '1'; }
            if (bool === true) { settingsArr[1] = '0'; }
            setCookie('settings', settingsArr);
        });

        if (settingsArr[0] == '0') {
            $('#setting-show-menu-rollovers').prop('checked', false);
            $('#primary-nav .tooltip').toggleClass('inactive');
        }

        if (settingsArr[1] == '0') {
            $('#setting-show-headshot').prop('checked', false);
            $('#profile-headshot').toggleClass('inactive');
        }

        /** Initialization */

        // When Bootstrap Tab Event fires, toggle Nav Element
        $(window).on('show.bs.tab', function() {
            $('.nav-element li').each(function() {
                $(this).toggleClass('active');
            });
        });

        // Display Get Started page until all Steps clicked
        var getStartedTotal = 0;

        for (var i = 0, max = getStartedArr.length - 1; i <= max; i++) {
            getStartedTotal += parseInt(getStartedArr[i]);
            if (getStartedTotal > 0) {
                $('#primary-nav a[href=#get-started]').tab('show');
            }
        }

        // Duplicate of code below
        var docHeight = $('body').outerHeight();
        $('#homepage_frame', parent.document).attr('style', function() {
            return 'height: ' + docHeight + 'px !important';
        }).css({'width': '100%', 'border': 'none'});

    });

    /** jQuery *Window* Ready
    ************************************************************/
    $(window).load(function() {

        /* Intended to void injected platform script containing function 'adjust_size' 
         * but only prevents '0' timeout set on the function which fires AFTER height
         * adjustment below (-35px) is made thus overwriting it's correction */
        window.adjust_size = function() { return false; };

        /* Remove additional 35 pixels added by injected platform script from iframe's
         * height for a perfect fit of iframe to iframe's content */
        // $('#homepage_frame', parent.document).css({ 'height': '-=35' });

        /* After initial iframe height adjustment on page load, continue to adjust 
         * iframe's height on 'body' height changes Note: using <body> tag works
         * across all browsers as opposed to inconsistencies using 'document' object
         * Note: Must include Ben Alman's jQuery Resize Plugin 'jquery.ba_resize.min.js'
         * (http://benalman.com/projects/jquery-resize-plugin/) */
        $('body').resize(function() {
            var docHeight = $(this).outerHeight();
            $('#homepage_frame', parent.document).attr('style', function() {
                return 'height: ' + docHeight + 'px !important';
            }).css({'width': '100%', 'border': 'none'});
        });

    });

})(jQuery);