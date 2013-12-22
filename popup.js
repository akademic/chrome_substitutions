$(function() {
    var dict = JSON.parse(localStorage['dictionary'])
    var is_enable = parseInt(localStorage['is_enable'], 10)
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
    })

    $(document).on('click', '.down', function() {
        var el = $(this)
        var tr = el.closest('tr')
        var next_tr = tr.next()
        var tmp = next_tr.clone()
        tr.before(tmp)
        next_tr.remove()
        $('#save').click()
    })

    $(document).on('click', '.del', function() {
        var el = $(this)
        var tr = el.closest('tr')
        tr.remove()
        $('#save').click()
    })

    $('#status').click(function() {
        if( is_enable ) {
            localStorage['is_enable'] = 0
            is_enable = 0
        }
        else {
            localStorage['is_enable'] = 1
            is_enable = 1
        }

        update_status()
    });

    function render_table() {
        $('#words').empty()
        var table = $('<table/>');
        var from_title = chrome.i18n.getMessage('table_title_from')
        var to_title = chrome.i18n.getMessage('table_title_to')
        var header = $('<tr><th></th><th>'+from_title+'</th><th>'+to_title+'</th><th></th><th></th></tr>')
        var new_word = $('<tr data-index="new"><td></td><td><input name="f"></td><td><input name="t"></td><td></td><td></td></tr>');
        header.appendTo(table)
        new_word.appendTo(table)

        $.each(dict, function(index, item) {
            $('<tr data-index="'+index+'"><td class="del"></td><td><input name="f" value="'+item['f']+'"></td><td><input name="t" value="'+item['t']+'"></td><td class="up"></td><td class="down"></td></tr>').appendTo(table);
        });

        table.appendTo('#words')
    }

    function update_status() {
        if( is_enable ) {
            $('#status').text(chrome.i18n.getMessage('status_enabled'))
            $('#status').css('color', 'green')
        }
        else {
            $('#status').text(chrome.i18n.getMessage('status_disabled'))
            $('#status').css('color', 'red')
        }

        $('#save').text(chrome.i18n.getMessage('save_button'))
        $('#status_description').text(chrome.i18n.getMessage('status_description'))
    }

    render_table()
    update_status()

});
