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

if( localStorage['dictionary'] == undefined ) {
    localStorage['dictionary'] = JSON.stringify(dictionary);
}

chrome.runtime.onMessage.addListener(function(mess, sender, send_resp) {
    if(mess.action == 'get_dict') {
        send_resp(localStorage['dictionary'])
    }
})
