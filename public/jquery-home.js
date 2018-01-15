var socket = io('http://localhost:1998')


$(document).ready(function () {
    // Set up the number formatting.      
    $('.price').number(true, 0);
    $('#view').DataTable();
    $('.sorting_asc').click();

    $('i.fa-pencil').click(() => {
        $("i.fa-pencil,.pop-q,.pop-u").css("display", "none");
        $(".edit").css("display", "inline-block");
    })
    $('i.fa-times, i.fa-check').click(() => {
        $("i.fa-pencil,.pop-q,.pop-u").css("display", "inline-block");
        $(".edit").css("display", "none");
    })


    $(function () {
        //----- OPEN
        $('.main').on('click', '[data-popup-open]', function (e) {
            var targeted_popup_class = jQuery(this).attr('data-popup-open');
            $('[data-popup=' + targeted_popup_class + ']').fadeIn(550);
            e.preventDefault();
            var name = $(this).parent().find('td#name').text();
            $('.pop-n').text(name)
            var unit = $(this).parent().find('a#unit').text();
            $('.pop-u').text(unit)
            var quantity = $(this).parent().find('#qua').text();
            $('.pop-q').text(quantity)
            var id_product = $(this).parent().find('#ID').text();
            $('.pop-id').text(id_product)
            var image = $(this).parent().find('td#image').text();

            $('.pop-i').attr('src', image)

            $('i.fa-pencil').click(() => {
                $('input.edit').attr('value', '10000');
                alert($('.pop-q').text())                  
            })                      
            $('i.fa-check').click(() => {
                var update = $('input#edit').val();
                $(this).parent().find('#qua').text(update);
            })
        });
        $('#check').click(() => {
            var update = $('input.edit').val();
            var id = $('.pop-id').text();
            $('a.pop-q').text(update);
            socket.emit('request-update',id,update)
        })

        //----- CLOSE
        $('[data-popup-close]').on('click', function (e) {
            var targeted_popup_class = jQuery(this).attr('data-popup-close');
            $('[data-popup=' + targeted_popup_class + ']').fadeOut(0);
            $('.pop-i').attr('src', '')
            $('i.fa-times').click();
            e.preventDefault();
        });


    });
    $(document).on('keyup', function (evt) {
        if (evt.keyCode == 27) {
            $('.popup-close').click()
        }
    });
});