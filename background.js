if( localStorage['dictionary'] == undefined ) {
    localStorage['dictionary'] = chrome.i18n.getMessage('data')
}

if( localStorage['is_enable'] == undefined ) {
    localStorage['is_enable'] = 1
}

chrome.runtime.onMessage.addListener(function(mess, sender, send_resp) {
    if(mess.action == 'get_dict') {
        var is_enable = parseInt(localStorage['is_enable'], 10)
        if( is_enable ) {
            send_resp(localStorage['dictionary'])
        }
        else {
            send_resp(JSON.stringify([]))
        }
    }
})
