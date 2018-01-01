$(document).ready(function() {
    $('.check').click(()=>{
        var link = $('#link-image').val();
        $('#preview').attr('src',link)
    })
    $('#view tr').click(function() {
        var name = $(this).find('td#name').text();
        $('.pop-n').text(name)
        var age = $(this).find('td#age').text();
        $('.pop-a').text(age)
        var image = $(this).find('td#image').text();
        $('.pop-i').attr('src',image)
    });
    $(function() {
        //----- OPEN
        $('[data-popup-open]').on('click', function(e)  {
            var targeted_popup_class = jQuery(this).attr('data-popup-open');
            $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);
            e.preventDefault();
        });
     
        //----- CLOSE
        $('[data-popup-close]').on('click', function(e)  {
            var targeted_popup_class = jQuery(this).attr('data-popup-close');
            $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);     
            e.preventDefault();
        });

        
    });
    $(document).on('keyup',function(evt) {
        if (evt.keyCode == 27) {
            $('.popup-close').click()
        }
    });
});