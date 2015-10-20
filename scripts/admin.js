var client = new Faye.Client('http://192.168.8.188:9292/')
//$('#foo-submit').click(function() {
//  client.publish('/msg', $('#foo').val())
//})
body = $('#scores table tr')
$(players).each(function(i, p) {
  showPlayer(body, codes[i], p)
})

$('[data-keystroke]').each(function(i, playerDisplay) {
  function getButton(cls, text) {
    return "<button type='button' class='btn " + cls + "'>" + text + "</button>"
  }

  var pd = $(playerDisplay)
  var k = pd.data['keystroke']

  pd.append('<hr>')
  $([1, 2, 5]).each(function(i, inc) {
    pd.append(getButton('btn-default', "+" + inc))
    pd.append(getButton('btn-danger', "-" + inc) +'<br>')
  })
})

function update(ks, amt) {
  client.publish('/score', "update(" + ks + ", " + amt + ")")
}

document.onclick = function(evt) {
  var e = evt.srcElement
  var amt = Number(e.innerText)
  var ks = $(e).parent().data('keystroke')
  update(ks, amt)
}