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

    $(window).resize(function () {
      if( $(this).width() > 1024 ) {
        $('html').removeClass('offcanvasactive');
        $('.offCanvasToggle').removeClass('active');
      }
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
    if ( $('#liveWrap').length === 0 ) {
      $('[href="#thumbnails"]').parent('li').addClass('active');
      $('#thumbnails').addClass('active');
    }

    else if ( $('#liveWrap').length > 0 ) {
      $('[href="#liveWrap"]').parent('li').addClass('active');
      $('#liveWrap').addClass('active');

      $('[href="#liveWrap"]').on('click', function (e) {
        $('[href="#liveWrap"]').parent('li').addClass('active');
        $('#liveWrap').addClass('active');
        $('[href="#thumbnails"]').parent('li').removeClass('active');
        $('#thumbnails').removeClass('active');
        e.preventDefault();
      });

      $('[href="#thumbnails"]').on('click', function (e) {
        $('[href="#liveWrap"]').parent('li').removeClass('active');
        $('#liveWrap').removeClass('active');
        $('[href="#thumbnails"]').parent('li').addClass('active');
        $('#thumbnails').addClass('active');
        e.preventDefault();
      });
    }



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

