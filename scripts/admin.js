client = new Faye.Client('http://192.168.8.165:9292/')

body = $('#scores table tr')
buzzDisplay = '<div data-keystroke="thekey"><h1>name</h1><audio src="/media/noise"></audio></div>'

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
  client.publish('/score', "update(" + ks + ", " + (updateCount + 1)+ ", " + amt + ")")
}

function sendShowPlayer(val) {
  //Obviously desperately insecure
  client.publish('/score', "showPlayer('" + val + "')")
}

function sendClear() {
  client.publish('/score', "receiveClear()")
}

function afterAdd(code, name) {
  var playerDisplay = $('td[data-keystroke="' + code + '"]')
  addButtons(playerDisplay)
  $('.buzzers').append(buzzDisplay.replace('thekey', code).replace('name', name).replace('noise', nextNoise()))
}

function requestSync() {
  if (updateCount > 0) {
    //No idea why we get an extraneous return at the beginning of the second string, or why that should cause a problem, but it do
    client.publish('/score', "receiveSync(" + updateCount + ", '" + $('#playerDisplay').html() + "', '" + $($('.buzzers')[0]).html().trim() + "'); updateCount = " + updateCount)
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

//This is a not-pretty hack. When we get the sync from the buzzer page, it has no buttons. So munge the UI to add them
function afterSync() {
  $('hr').remove()
  $('#playerDisplay br').remove()
  $('#playerDisplay span.score').before('<br>')
  $('#playerDisplay td').each(function(i, p){addButtons(p)})
}

sendRequestSync()
