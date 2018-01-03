var socket = io('http://localhost:1998')

// socket.on('list', function (list) {
//     $('tbody.list').html('');
//     var stt = 0;
//     $.each(list, function(ind,i) {
//         var date = new Date(i.date)
//         stt++;  
//         var d = date.getDate();
//         if (d < 10) d = "0" + d;
//         var mo = date.getMonth() + 1;
//         if (mo < 10) mo = "0" + mo;
//         var h = date.getHours();
//         if (h < 10) h = "0" + h;
//         var m = date.getMinutes();
//         if (m < 10) m = "0" + m;
//         $('tbody.list').append("<tr><td  data-popup-open='popup-1'>" + stt + "</td><td id='name'  data-popup-open='popup-1'>" + i.name + "</td><td id='age'  data-popup-open='popup-1'>" + i.age + "</td><td id='date'  data-popup-open='popup-1'>" + h + ":" + m + "-" + d + "/" + mo + "/" + date.getFullYear()) // + "</td><td style='display: none' id='image'>" + i.image + "</td><td style='display: none' id='ID'>" + i._id + "</td></tr>")
//         $('#view').DataTable();  
//     });
// })

// $(window).on('focus', function () {
//     socket.emit('send-list');
// })

$(document).ready(function () {

    $('#view').DataTable();  
    $('.sorting_asc').click();
    $('.check').click(() => {
        var link = $('#link-image').val();
        $('#preview').attr('src', link)
    })

    $('.form-control').keydown(function (e) {
        if (e.which === 13) {
            var index = $('.form-control').index(this) + 1;
            $('.form-control').eq(index).focus();
        }
    });

    $('#link-image').keydown(function (e) {
        if (e.which === 13) {
            $('a.check').click()
        }
    })

    $('form input').on('keypress', function (e) {
        return e.which !== 13;
    });

    $(function () {
        //----- OPEN
        $('.main').on('click','[data-popup-open]', function (e) {
            var targeted_popup_class = jQuery(this).attr('data-popup-open');
            $('[data-popup=' + targeted_popup_class + ']').fadeIn(550);
            e.preventDefault();            
                var name = $(this).parent().find('td#name').text();
                $('.pop-n').text(name)
                var age = $(this).parent().find('td#age').text();
                $('.pop-a').text(age)
                var image = $(this).parent().find('td#image').text();
                $('.pop-i').attr('src', image)
                var id = $(this).parent().find('td#ID').text();
                $('.pop-id').text(id)            
        });

        //----- CLOSE
        $('[data-popup-close]').on('click', function (e) {
            var targeted_popup_class = jQuery(this).attr('data-popup-close');
            $('[data-popup=' + targeted_popup_class + ']').fadeOut(0);
            $('.pop-i').attr('src', '')
            e.preventDefault();
        });


    });
    $(document).on('keyup', function (evt) {
        if (evt.keyCode == 27) {
            $('.popup-close').click()
        }
    });
});