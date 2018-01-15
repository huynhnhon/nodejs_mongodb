var socket = io('http://localhost:1998')

$(document).ready(function () {

    $('.price').number(true, 0);
    $('a.image').click(() => {
        var link = $('#linkimage').val();
        console.log(link.lenght);
        if (!link) {
            
        }else{
            $('#preview').attr('src', link)
        }
    })

    $('a.reset').click(() => {
        $('form').find("input[type=text], textarea, input[type=number]").val("");
    })

    $('form input').keydown(function (e) {
        if ((e.keyCode == 13)) {
            var inputs = $(this).parents("form").eq(0).find(":input");
            if (inputs[inputs.index(this) + 1] != null) {
                inputs[inputs.index(this) + 1].focus();
            }

            e.preventDefault();
            return false;
        }
    });
    
    socket.emit('send-suggest');
    var sg_code = [];
    var sg_name = [];
    var sg_unit = [];
    var sg_cate = [];
    socket.on('list-suggest', function (danhsach) {

        $.each(danhsach, function (ind, i) {
            sg_code.push(i.product_code);
            sg_name.push(i.product_name);
            sg_unit.push(i.unit);
            sg_cate.push(i.category);
        })
        sg_code = jQuery.unique(sg_code);
        sg_name = jQuery.unique(sg_name);
        sg_unit = jQuery.unique(sg_unit);
        sg_cate = jQuery.unique(sg_cate);
    })

    $("input#code").autocomplete({
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
})