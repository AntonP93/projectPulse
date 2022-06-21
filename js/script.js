$(document).ready(function(){
  $('.carousel_inner').slick({
        infinite: true,
        speed: 1000,
        adaptiveHeight: true,
        prevArrow:'<button type="button" class="slick-prev"><img src="../icons/slide/arrow_l.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../icons/slide/arrow_r.svg"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                  dots: true,
                  arrows:false
                }
              }
        ]
      }); 

      $('ul.catalog_tabs').on('click', 'li:not(.catalog_tab_active)', function() {
        $(this)
        .addClass('catalog_tab_active').siblings().removeClass('catalog_tab_active')
        .closest('div.container').find('div.catalog_content').removeClass('catalog_content_active').eq($(this).index()).addClass('catalog_content_active');
      });

      // $('.catalog-item_link').each(function(i) {
      //   $(this).on('click',function(e){
      //     e.preventDefault();
      //     $('.catalog-item_content').eq(i).toggleClass('catalog-item_content_active');
      //     $('.catalog-item_list').eq(i).toggleClass('catalog-item_list_active');
      //   })
      // });

      // $('.catalog-item_back').each(function(i) {
      //   $(this).on('click',function(e){
      //     e.preventDefault();
      //     $('.catalog-item_content').eq(i).toggleClass('catalog-item_content_active');
      //     $('.catalog-item_list').eq(i).toggleClass('catalog-item_list_active');
      //   })
      // });
      
      function toggleSlide(item){
        $(item).each(function(i) {
          $(this).on('click',function(e){
            e.preventDefault();
            $('.catalog-item_content').eq(i).toggleClass('catalog-item_content_active');
            $('.catalog-item_list').eq(i).toggleClass('catalog-item_list_active');
          })
        });
      };

      toggleSlide('.catalog-item_link');
      toggleSlide('.catalog-item_back');

      //modal

      $('[data-modal=consultation').on('click', function(){
         $('.overlay, #consultation').fadeIn(); 
      });

      $('.modal_close').on('click', function(){
        $('.overlay, #consultation, #thnks, #order' ).fadeOut();
      }); 
      
      $('.button_mini').on('click', function(){
        $('.overlay, #order').fadeIn(); 
      }); 

      $('#consultation-form').validate();
      $('#consultation form').validate({
        rules:{
          name: "required",
          phone: "required",
          email: {
            required: true,
            email: true
          }
        }
      });
      $('#order form').validate();
      
      $('form').submit(function(e){
        e.preventDefault();

        if(!$(this).valid()){
          return;
        }
        $.ajax({
          type: "POST",
          url: "mailer/smart.php",
          data : $(this).serialize()
        }).done(function(){
          $(this).find("input").val("");
          $('#consultation,#order').fadeOut();
          $('.overlay,#thnks').fadeIn();

          $('form').trigger('reset');
        });
        return false;
      });

      $(window).scroll(function(){
        if($(this).scrollTop() > 1500){
          $('.pageup').fadeIn();
        } else {
          $('.pageup').fadeOut();
        }
      })
});