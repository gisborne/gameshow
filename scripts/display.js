var client = new Faye.Client('http://localhost:9292/')
var subscription = client.subscribe('/msg', function(message) {
  eval(message)
})

var lockTime = 3 //Time in seconds after a key is received where we don't accept others
var locked = false

$(document).keydown(function(evt) {
  var code = evt.which

  console.log(code)

  var playerDiv = $('.jumbotron .row[data-keystroke="' + code + '"]')

  if (playerDiv.length > 0) {
    if (! locked) {
      locked = true
      window.setTimeout(function() {
            locked = false
            playerDivs.hide()
          }, lockTime * 1000)
      playerDivs.hide()
      playerDiv.show()
      playerDiv.children('audio')[0].play()
    }
  }
})

j = $('.jumbotron')
$(function() {
  $(codes).each(function(i, c) {
    $('.jumbotron').append(buzzDisplay.replace('thekey', c).replace('name', players[i]).replace('noise', sounds[i]))
    $('.body').append(playerDisplay.replace('thekey', c).replace('name', players[i]))
  })

  playerDivs = $('.jumbotron .row')
})