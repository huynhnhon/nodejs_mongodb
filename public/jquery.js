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
    var sg_code = new Array();
    var sg_name = new Array();
    var sg_unit = new Array();
    var sg_cate = new Array();

    $('#view').DataTable();
    $('.sorting_asc').click();
    $('a.image').click(() => {
        var link = $('#linkimage').val();
        console.log(link.lenght);
        if (link.lenght !== 0) {
            $('#preview').attr('src', link)
        }
    })

    $('a.reset').click(() => {
        $('form').find("input[type=text], textarea, input[type=number]").val("");
    })

    $('form input').keydown(function (e) {
        if ((e.keyCode == 13) || (e.keyCode == 39)) {
            var inputs = $(this).parents("form").eq(0).find(":input");
            if (inputs[inputs.index(this) + 1] != null) {
                inputs[inputs.index(this) + 1].focus();
            }

            e.preventDefault();
            return false;
        }
        if (e.keyCode == 37) {
            var inputs = $(this).parents("form").eq(0).find(":input");
            if (inputs[inputs.index(this) - 1] != null) {
                inputs[inputs.index(this) - 1].focus();
            }
        }
    });

    socket.emit('send-suggest');

    socket.on('list-suggest', function (danhsach) {

        $.each(danhsach, function (ind, i) {
            sg_code.push(i.product_code);
            sg_name.push(i.product_name);
            sg_unit.push(i.unit);
            sg_cate.push(i.category);
        })
    })

    $("#code").autocomplete({
        source: sg_code
    });
    $("#name").autocomplete({
        source: sg_name
    });
    $("#unit").autocomplete({
        source: sg_unit
    });
    $("#cate").autocomplete({
        source: sg_cate
    });
    // $('form input').on('keypress', function (e) {
    //     return e.which !== 13;
    // });

    // $('.form-control').keydown(function (e) {
    //     if (e.which === 13) {
    //         var index = $('.form-control').index(this) + 1;
    //         $('.form-control').eq(index).focus();
    //     }
    // });

    // $('#link-image').keydown(function (e) {
    //     if (e.which === 13) {
    //         $('a.check').click()
    //     }
    // })



    $(function () {
        //----- OPEN
        $('.main').on('click', '[data-popup-open]', function (e) {
            var targeted_popup_class = jQuery(this).attr('data-popup-open');
            $('[data-popup=' + targeted_popup_class + ']').fadeIn(550);
            e.preventDefault();
            var name = $(this).parent().find('td#name').text();
            $('.pop-n').text(name)
            var unit = $(this).parent().find('td#unit').text();
            $('.pop-u').text(" " + unit)
            var quantity = $(this).parent().find('td#quantity').text();
            $('.pop-q').text(quantity)
            var image = $(this).parent().find('td#image').text();
            $('.pop-i').attr('src', image)

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