var lockTime = 3 //Time in seconds after a key is received where we don't accept others
var locked = false

buzzDisplay = '<div data-keystroke="thekey"><h1>name</h1><audio src="/media/noise"></audio></div>'

function buzz(code) {
  playerDivs = $('.buzzers div')

  console.log(code)

  playerDiv = $('.buzzers div[data-keystroke="' + code + '"]')
  if (playerDiv.length > 0) {
      locked = true
      window.setTimeout(function() {
        locked = false
        playerDivs.hide()
      }, lockTime * 1000)
      playerDivs.hide()
      playerDiv.show()
      playerDiv.find('audio')[0].play()
    }
}

function sendBuzz(code) {
  client.publish('/score', "buzz(" + code + ")")
}
$(document).keydown(function(evt) {
  var code = evt.which
  if (! locked) {
    sendBuzz(code)
  }
})

function afterAdd(code, name) {
  $('.buzzers').append(buzzDisplay.replace('thekey', code).replace('name', name).replace('noise', nextNoise()))
}

function requestSync() {
  if (updateCount > 0) {
    client.publish('/score', "receiveSync(" + updateCount + ", '" + $('#playerDisplay').html() + "', '" + $($('.buzzers')[0]).html().trim() + "'); updateCount = " + updateCount)
  }
}

sendRequestSync()
