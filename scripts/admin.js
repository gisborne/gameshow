client = new Faye.Client('http://192.168.8.188:9292/')

body = $('#scores table tr')

function getButton(cls, text) {
  return "<button type='button' class='btn " + cls + "'>" + text + "</button>"
}

function addButtons(playerDisplay) {
  var pd = $(playerDisplay)
  var k = pd.data['keystroke']

  pd.append('<hr>')
  $([1, 2, 5]).each(function (i, inc) {
    pd.append(getButton('btn-default', "+" + inc))
    pd.append(getButton('btn-danger', "-" + inc) + '<br>')
  })
}

function sendUpdate(ks, amt) {
  client.publish('/score', "update(" + ks + ", " + amt + ")")
}

function sendShowPlayer(val) {
  //Obviously desperately insecure
  client.publish('/score', "showPlayer('" + val + "')")
}

function afterAdd(code, name) {
  var playerDisplay = $('td[data-keystroke="' + code + '"]')
  addButtons(playerDisplay)
}

function requestSync() {
  if (updateCount > 0) {
    client.publish('/score', "receiveSync(" + updateCount + ", '" + $('#playerDisplay').html() + "'); updateCount = " + updateCount)
  }
}


document.onclick = function (evt) {
  var e = evt.srcElement
  var amt = Number(e.innerText)
  if (amt) {
    var ks = $(e).parent().data('keystroke')
    sendUpdate(ks, amt)
  }
}

form = $('#addPlayerForm')

form.submit(function (evt) {
  evt.preventDefault()

  val = $('#nameField').val()
  if (val.length > 1) {
    sendShowPlayer(val)
  }
})


$('#addPlayerModal').on('shown.bs.modal', function() {
  $(this).find('#nameField').focus()
})

sendRequestSync()