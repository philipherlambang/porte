$(document).ready(function() {

  autoPlayYouTubeModal();

  function autoPlayYouTubeModal() {
      var trigger = $("body").find('[data-toggle="modal"]');
      trigger.click(function () {
          var theModal = $(this).data("target"),
              videoSRC = $(this).attr("data-theVideo"),
              videoSRCauto = videoSRC + "?autoplay=0";
          $(theModal + ' iframe').attr('src', videoSRCauto);
          $(theModal + ' button.close').click(function () {
              $(theModal + ' iframe').attr('src', videoSRC);
          });
      });
  }


  $('#scrollDown').on('click', function(){
    $('html, body').animate({
        scrollTop: $("#section_1").offset().top
    }, 400);
  });

  console.log(navigator.appVersion.indexOf("iPad"));
  console.log(navigator.appVersion.indexOf("Android") == -1);
  console.log(navigator.appVersion.indexOf("iPad") == -1);
  console.log($(window).width() >= 800);

  if ($(window).width() >= 800 && navigator.appVersion.indexOf("iPad") == -1 && navigator.appVersion.indexOf("Android") == -1) {
    // alert('layar besar');

    $('html, body').animate({scrollTop: 0}, 2000, 'easeInOutCubic', function() {
      scroll = 0;
    });

    // center slider



    // function scroll

    var scroll     = 0;
    var slading    = 0;
    var height     = $("section:eq(0)").height();
    var offset_top = 0;
    var body       = document.body,
        html       = document.documentElement;
    var max_height = Math.max( body.scrollHeight, body.offsetHeight,
                         html.clientHeight, html.scrollHeight, html.offsetHeight );

    var eq         = 1;

    var mentok_atas  = 0;
    var mentok_bawah = 0;

    var step = 0;

    // build slider

    var count  = $("section .cling.kiri").length;

    var count_all = $("section").length;

    var konten_kiri  = "";
    var konten_kanan = "";

    var cling_height       = $(".cling").height();
    var cling_height_final = cling_height * (count - 1);

    for (var a = 1, b = count; a <= count; a++, b--) {

      ((a != 1)? style='style="margin-top:-20px"' : style='' );
      ((a == 1)? style_kiri='style="margin-top:-'+cling_height_final+'px"' : style_kiri='' );
      ((a == 1)? cls='first' : cls='' );

      konten_kiri  += '<div class="'+cls+' cling kiri full-height-percent" '+style+style_kiri+'>'+$("section:eq("+b+") .cling.kiri").html()+'</div>';
      konten_kanan  += '<div class="'+cls+' cling kiri full-height-percent" '+style+'>'+$("section:eq("+a+") .cling.kanan").html()+'</div>';

    }

    for (var a = 1; a <= count-1; a++) {
      $('section:eq(2)').remove();
    }

    $("section:eq(1) .col-md-6:eq(0) div:eq(0)").html(konten_kiri);
    $("section:eq(1) .col-md-6:eq(1) div:eq(0)").html(konten_kanan);

    var wew = {
      up : function() {

        if (scroll == 0) {
          scroll = 1;
          if (step == 1) {
            // $('#header2').css("margin-top", "-100px");
            $('#header2').css({"margin-top": "-150px", "opacity": "0"});
          }

          // jika sudah mentok atas
          if (step == 0) {
            scroll = 0;
            return null;
          }else{
            // if sladding true
            if (wew.cek_slading() == 1) {
              wew.slide_prev()
            }else{
              offset_top -= height;
              $('html, body').animate({scrollTop: offset_top}, 400, 'easeInOutCubic', function() {})
            }
            step -= 1;
            setTimeout(function () {
              scroll = 0;
            }, 400);
          }

        }

      },
      down : function() {

        if (scroll == 0) {
          scroll = 1;
          $('#header2').css({"margin-top": "0px", "opacity": "1"});

          // jika sudah mentok bawah
          if (step == count_all) {
            scroll = 0;
            return null;
          }else{
            step += 1;

            // if sladding true
            if (wew.cek_slading() == 1) {
              wew.slide_next()
            }else{
              offset_top += height;
              $('html, body').animate({scrollTop: offset_top}, 400, 'easeInOutCubic', function() {})
            }
            setTimeout(function () {
              scroll = 0;
            }, 400);
          }

        }

      },
      cek_slading : function() {
        var r = 0;
        // if ( Math.round($('section .col-md-6:eq(0) .cling.first').css("margin-top").slice(0, -2)) != '0') {
          if (step >= 2 && step <= count) {
            r =  1;
          }
        // }

        console.log(step);
        console.log(r);
        return r;
      },
      slide_next : function() {
        $("section .col-md-6:eq(0) .cling.first").css({'margin-top': '+='+cling_height})
        $("section .col-md-6:eq(1) .cling.first").css({'margin-top': '-='+cling_height})
      },
      slide_prev : function() {
        $("section .col-md-6:eq(0) .cling.first").css({'margin-top': '-='+cling_height})
        $("section .col-md-6:eq(1) .cling.first").css({'margin-top': '+='+cling_height})
      }
    };

    $(window).scrollsteps({
      up: wew.up,
      down: wew.down
    });
  }else{
    $('body').css({
      'overflow-x': 'hidden',
      'overflow-y': 'scroll'
    });

    $('.section-slider .col-md-6').css({
      'height'         : '470px',
    });

    if (navigator.appVersion.indexOf("iPad") != -1) {
      $('.section-slider .col-md-6').css({
        'height'         : '50vh',
      });
    }

    $('.section-slider .cling .section-body').css({
      'height': 'auto',
    });

    $('.section-slider .cling .section-desc').css({
      'padding': '0px',
    });

    var lastScrollTop = 0;
    $(window).scroll(function(event){
       var st = $(this).scrollTop();
       if (st > lastScrollTop){
         if (st > 0) {
           // $('#header2').css("margin-top", "0px");
           $('#header2').css({"margin-top": "0px", "opacity": "1"});
         }
       } else {
        // $('#header2').css("margin-top", "-100px");
          $('#header2').css({"margin-top": "-150px", "opacity": "0"});
       }
       lastScrollTop = st;
    });
  }

});
