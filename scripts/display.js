var client = new Faye.Client('http://192.168.8.188:9292/')
var subscription = client.subscribe('/score', function(message) {
  eval(message)
})

var lockTime = 3 //Time in seconds after a key is received where we don't accept others
var locked = false

function buzz(code) {
  console.log(code)

  var playerDiv = $('.buzzers div[data-keystroke="' + code + '"]')

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

j = $('.buzzers')
body = $('#scores table tr')
$(function() {
  $(players).each(function(i, p) {
    j.append(buzzDisplay.replace('thekey', codes[i]).replace('name', p).replace('noise', sounds[i]))
    showPlayer(body, codes[i], players[i])

  })

  playerDivs = $('.buzzers div[data-keystroke]')
})

function update(ks, amt) {
  console.log("update " + ks + " with " + amt)
  var elt = $('[data-keystroke=' + ks +"] span")
  var current = Number(elt.html())
  elt.html(current + amt)
}