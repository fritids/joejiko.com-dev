define(["require","jquery"], function(require, $) {
  console.log("@app loaded");
  var _app = {
    resizeTimer: null
  }
  var _appui = {
    main: $('.main'),
    sidebar: $('.site-sidebar')
  };

  function alertMessage() {
    alert($(this).attr('data-message'));
  }

  function ready() {
    $.event.trigger({type: "app.ui.ready"});
    var $appMenu = $('.app-menu--loading');
    $appMenu.removeClass('app-menu--loading');
  }

  function resizeUi(){
    var viewportHeight = window.innerHeight ? window.innerHeight : $(window).height();
    // console.log('@sizing: viewportHeight: '+viewportHeight);
    _appui.main.animate({
      height: viewportHeight-65
    }, 500, function(){
      _appui.sidebar.animate({
        height: viewportHeight-65
      }, 500);
      _appui.sidebar.find('.sidebar-module-wrapper').css({"height": viewportHeight-65});
    });
  }

  function resize() {
    // console.log("delay resize a bit.. ;]");
    // delay a bit..
    if(_app.resizeTimer) window.clearTimeout(_app.resizeTimer);
    _app.resizeTimer = window.setTimeout(resizeUi, 700);
  }

  function handleResize(evt) {
    $.event.trigger({type: 'resizeViews'});
    evt.stopPropagation();
    evt.stopImmediatePropagation();
  }

  function handleTrigger() {
    switch($(this).attr('data-trigger')) {
      case "message":
        alertMessage.apply(this);
        break;
      default:
        alert("not sure what to do.");
    }
    if($(this).is('a')){ return false; }
  }
  return {
    start: function(){
      $.event.trigger({type: "app.start"});
      $(document).ready(function(){
        resize();
        ready();

        // alerts
        $(document).on('click', '[data-trigger]', handleTrigger);

        // resize app view
        $(window).on('resize', handleResize);
        $(document).on('resizeViews', resize);

        // do this last
        require(
          [
            "app/ui/_global/menu",
            "app/ui/_global/search",
            "app/ui/_global/user"
          ],
          function(Menu, Search, User){
            // start global modules
            Menu.start();
            Search.start();
            User.start();

            /**
             * @todo
            requireCondition({
              'steam':['app/gaming/steam'],
              'steam-widget': ['app/gaming/steam'],
              'books': ['app/books/search']
            });
             *
            **/

            if( $(document).find('.steam').length ){
              require(['app/gaming/steam'], function( Steam ) {
                console.log(JSON.stringify(Steam));
              });
            }

            if( $(document).find('.steam-widget').length ) {
              require(['app/gaming/steam'], function ( Steam ) {
                console.log(JSON.stringify(Steam));
              });
            }

            if( $(document).find('.books').length ) {
              require(['app/books/search'], function( BookSearch ) {
                console.log(JSON.stringify(BookSearch));
              });
            }

            if( $(document).find('.questions').length ) {
              require(['app/questions/main'], function( Question ) {
                console.log( JSON.stringify(Question) );
              });
            }

            // load last
            require(["app/ui/_global/tooltip", "app/ui/_global/footer"], function(Tooltip, Footer){
              Tooltip.start();
              Footer.start();
            });
        });
      });
    }
  };
});