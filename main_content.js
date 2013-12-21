var getTextNodesIn = function(el) {
    return $(el).find(":not(iframe)").addBack().contents().filter(function() {
        return this.nodeType == 3;
    });
};

function substitute_text(dictionary) {
    var nodes = getTextNodesIn('html')
    $.each(nodes, function(nid, node) {
        var text = node.textContent
        var mod = text
        $.each(dictionary, function(index, item) {
            var from = item['f']
            var to = item['t']
            mod = subst_item( from, to, mod)

            var cfrom = from.charAt(0).toUpperCase() + from.slice(1)
            var cto = to.charAt(0).toUpperCase() + to.slice(1)
            mod = subst_item( cfrom, cto, mod)

        });

        node.textContent = mod;
    })
}

function subst_item(item, to, mod) {
    var regex = new RegExp(item, 'g')
    mod = mod.replace(regex, to);
    return mod
}

function _init() {
    chrome.runtime.sendMessage({action: "get_dict"}, function(response) {
        var dict = JSON.parse(response)
        substitute_text(dict)
    });
}


$(_init)

