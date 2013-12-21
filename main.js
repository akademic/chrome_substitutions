var dictionary = [
{f: 'свидетели', t: 'знакомые чуваки'},
{f: 'свидетелей', t: 'знакомых чуваков'},
{f: 'предположительно', t: 'вроде как'},
{f: 'новые исследования', t: 'пост на tumblr\'е'},
{f: 'восстановить', t: 'отомстить за'},
{f: 'смартфон', t: 'томагочи'},
{f: 'электрический', t: 'атомный'},
{f: 'депутат', t: 'эльфийский лорд'},
{f: 'выборы', t: 'еда на скорость'},
{f: 'лидеры партий', t: 'духи реки'},
{f: 'лидер партии', t: 'дух реки'},
{f: 'АНБ', t: 'КВН'},
{f: 'отказался давать коментарии', t: 'виновен, и все прекрасно это знают'},
{f: 'Единая Россия', t: 'Партия Жуликов и Воров'},
]

var getTextNodesIn = function(el) {
    return $(el).find(":not(iframe)").addBack().contents().filter(function() {
        return this.nodeType == 3;
    });
};

function substitute_text() {
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

$(substitute_text)

