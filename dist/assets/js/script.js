/*
 * Scripts
 */

;(function ( $, window, undefined ) {

  $(document).ready(function () {

    /**
     * Nav Hovers
     */
    $('a[data-filter]').each(function() {
      $(this).click(function() {
        $(this).parents('ul').find('li').removeClass('active');
        $(this).parent('li').toggleClass('active');
      });
    });


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

    $(window).resize(function () {
      if( $(this).width() > 1024 ) {
        $('html').removeClass('offcanvasactive');
        $('.offCanvasToggle').removeClass('active');
      }
    });

    $('.exitOffCanvas').click(function (e) {
      $('.offCanvasToggle').toggleClass('active');
      $('html').removeClass('offcanvasactive');
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

    $('#primaryNav').on( 'click', 'a[data-filter]', function() {
      var filterValue = $(this).attr('data-filter');
      $container.isotope({ filter: filterValue });
    });

    // window.addEventListener("beforeunload", function (e) {
    //   $container.isotope( 'remove', elements );
    // });

    // $('a[href]').on('click', function (e) {
    //   $container.isotope( 'remove', elements );
    //   e.preventDefault();
    // });


    /**
     * jQuery UI (Tabs only)
     */
    $( ".tabs" ).tabs();


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

  });

}(jQuery, window));

