$(function() {
    var dict = JSON.parse(localStorage['dictionary'])
    $('#save').click(function() {
        var rows = $('#words tr[data-index]')
        var collect_dict = []
        $.each(rows, function(index, el) {
            var tr = $(el)
            var dict_key = tr.data('index')
            var f = tr.find('input[name="f"]').val()
            var t = tr.find('input[name="t"]').val()
            if(dict_key == 'new' ) {
                if(f != '' && t != '') {
                    collect_dict.push({f: f, t: t})
                }
            }
            else {
                collect_dict.push({f: f, t: t})
            }
        });

        dict = collect_dict

        localStorage['dictionary'] = JSON.stringify(dict)
        render_table()
    });

    $(document).on('click', '.up', function() {
        var el = $(this)
        var tr = el.closest('tr')
        var prev_tr = tr.prev()
        var tmp = prev_tr.clone()
        tr.after(tmp)
        prev_tr.remove()
        $('#save').click()
    });

    $(document).on('click', '.down', function() {
        var el = $(this)
        var tr = el.closest('tr')
        var next_tr = tr.next()
        var tmp = next_tr.clone()
        tr.before(tmp)
        next_tr.remove()
        $('#save').click()
    });


    function render_table() {
        $('#words').empty()
        var table = $('<table/>');
        var header = $('<tr><th>Строка</th><th>На что меняем</th><th></th><th></th></tr>')
        var new_word = $('<tr data-index="new"><td><input name="f"></td><td><input name="t"></td><td></td><td></td></tr>');
        header.appendTo(table)
        new_word.appendTo(table)

        $.each(dict, function(index, item) {
            $('<tr data-index="'+index+'"><td><input name="f" value="'+item['f']+'"></td><td><input name="t" value="'+item['t']+'"></td><td class="up">up</td><td class="down">down</td></tr>').appendTo(table);
        });

        table.appendTo('#words')
    }

    render_table()

});
