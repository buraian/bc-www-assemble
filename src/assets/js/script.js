/*
 * Scripts
 */

;(function ( $, window, undefined ) {

  $(document).ready(function () {

    /**
     * Perfect Scrollbar
     */
    $('#primaryStack, #tertiaryStack').perfectScrollbar({
      includePadding: true,
      suppressScrollX: true
    });

    /**
     * Off Canvas Nav
     */
    $('.offCanvasToggle').click(function (e) {
      $(this).toggleClass('active');
      $('html').toggleClass('offcanvasactive');
      e.preventDefault();
    });

    $('.exitOffCanvas').click(function (e) {
      $('html').removeClass('offcanvasactive');
      $('.offCanvasToggle').toggleClass('active');
      e.preventDefault();
    });

    /**
     * Isotope
     */
    var $container = $('.home #main').isotope({
      itemSelector: '.tile',
      layoutMode: 'masonry',
      masonry: {
        columnWidth: 60,
        gutter: 4
      }
    });

    var urlHashValue = window.location.hash.replace( /^#/, '' );

    $container.isotope( $.deparam( urlHashValue, true ) );

    $('#primaryNav').on( 'click', 'a[data-filter]', function () {
      var filterValue = $(this).attr('data-filter');
      $container.isotope({ filter: filterValue });
    });

    $('[data-filter]').each(function () {
      $(this).attr('href', '/#' + $.param({ filter: $(this).attr('data-filter') }));
    });

    /**
     * Primary Nav
     */
    $('.home .primaryNav > ul > li:first-child').addClass('active');

    $('[data-filter]').each(function () {

      var thisHref = $(this).attr('href').replace( /^\/#/, '' );
      // var urlHashValue = window.location.hash.replace( /^#/, '' );

      if (thisHref == urlHashValue) {
        $(this).parents('ul').find('li').removeClass('active');
        $(this).parent('li').addClass('active');
      }

      $(this).click(function () {
        $(this).parents('ul').find('li').removeClass('active');
        $(this).parent('li').toggleClass('active');
      });
    });

    /**
     * Tertiary Nav
     */
    // http://www.jacklmoore.com/notes/jquery-tabs/
    $('.tabs').each(function () {
      // For each set of tabs, we want to keep track of
      // which tab is active and it's associated content
      var $active, $content, $links = $(this).find('a[href^="#"]');

      // If the location.hash matches one of the links, use that as the active tab.
      // If no match is found, use the first link as the initial active tab.
      $active = $($links.filter('[href="' + location.hash + '"]')[0] || $links[0]);
      $active.parent('li').addClass('active');

      $content = $($active[0].hash);
      $content.addClass('active');

      // Hide the remaining content
      $links.not($active).each(function () {
        $(this.hash).removeClass('active');
      });

      // Bind the click event handler
      $(this).on('click', 'a[href^="#"]', function (e) {
        // Make the old tab inactive.
        $active.parent('li').removeClass('active');
        $content.removeClass('active');

        // Update the variables with the new link and content
        $active = $(this);
        $content = $(this.hash);

        // Make the tab active.
        $active.parent('li').addClass('active');
        $content.addClass('active');

        // Prevent the anchor's default click action
        e.preventDefault();
      });
    });

    /**
     * Nivo Lightbox
     */
    $('.teaser').each(function( index ) {
      var thumbnailArr = $(this).find('.tile.thumbnail a[rel=enlarge]');
      if( thumbnailArr.length > 1 ) {
        thumbnailArr.attr('data-lightbox-gallery', index );
      }
    });

    $('.tile.thumbnail a[rel=enlarge]').nivoLightbox({
      effect: 'fade',                             // The effect to use when showing the lightbox
      theme: 'default',                           // The lightbox theme to use
      keyboardNav: true,                          // Enable/Disable keyboard navigation (left/right/escape)
      clickOverlayToClose: true,                  // If false clicking the "close" button will be the only way to close the lightbox
      onInit: function(){},                       // Callback when lightbox has loaded
      beforeShowLightbox: function(){},           // Callback before the lightbox is shown
      afterShowLightbox: function(lightbox){},    // Callback after the lightbox is shown
      beforeHideLightbox: function(){},           // Callback before the lightbox is hidden
      afterHideLightbox: function(){},            // Callback after the lightbox is hidden
      onPrev: function(element){},                // Callback when the lightbox gallery goes to previous item
      onNext: function(element){},                // Callback when the lightbox gallery goes to next item
      errorMessage: 'The requested content cannot be loaded. Please try again later.' // Error message when content can't be loaded
    });

    /**
     * Layout
     */
    var smallMin   = 0,
        smallMax   = 640,
        mediumMin  = 641,
        mediumMax  = 1024,
        largeMin   = 1025,
        largeMax   = 1440,
        xlargeMin  = 1441,
        xlargeMax  = 1920,
        xxlargeMin = 1921;

    $(window).resize(function () {

      var $windowWidth = $(this).width();

      /*
      if( $windowWidth <= smallMax ) {

      } else if( $windowWidth >= mediumMin ) {

      } else if( $windowWidth >= mediumMin && $windowWidth <= mediumMax ) {

      } else if( $windowWidth <= mediumMax ) {

      } else */if( $windowWidth >= largeMin ) {

        $('html').removeClass('offcanvasactive');
        $('.offCanvasToggle').removeClass('active');
        // $('.portfolioStack .tabs a[href^="#"]').not(':visible')

      } /*else if( $windowWidth >= largeMin && $windowWidth <= largeMax ) {

      } else if( $windowWidth <= largeMax ) {

      } else if( $windowWidth >= xlargeMin ) {

      } else if( $windowWidth >= xlargeMin && $windowWidth <= xlargeMax ) {

      } else if( $windowWidth <= xlargeMax ) {

      } else if( $windowWidth >= xxlargeMin ) {

      } */

      // if( $windowWidth > mediumMax ) {
      //   $('html').removeClass('offcanvasactive');
      //   $('.offCanvasToggle').removeClass('active');
      //   console.log('>= largeMin');
      // }
    });

  });

}(jQuery, window));
