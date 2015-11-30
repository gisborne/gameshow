$.getScript()
var client = new Faye.Client('http://192.168.8.188:9292/')
var lastId = null

var subscription = client.subscribe('/score', function(message) {
  eval(message)
})

codes = [87, 65, 83, 68, 70, 71, 32, 37]
sounds = [
  "Alarm.mp3",
  "CartoonBoing.mp3",
  "Bark.mp3",
  "JetFlyBy.mp3",
  "Duck.mp3",
  "WalrusRoar.mp3",
  "MotorcycleHarleyRevs.mp3",
  "HorseWhinny.mp3"]

function playerCount() {
  return $('#playerDisplay').find('td').length
}

function nextCode() {
  return codes[playerCount()]
}

function nextNoise() {
  return sounds[playerCount() - 1]
}

playerDisplay = '<td data-keystroke="thekey">name<br><span class="score">0</span></td>'

showPlayer = function showPlayer(name) {
  where = $('#playerDisplay')
  code = nextCode()
  where.append(playerDisplay.replace('thekey', code).replace('name', name))
  afterAdd(code, name)
  where.data('count', Number(where.data('count')) + 1)
}

function update(ks, id, amt) {
  if (id != lastId) {
    console.log("update " + ks + " with " + amt)
    var elt = $('[data-keystroke=' + ks +"] span")
    var current = Number(elt.html())
    elt.html(current + amt)
  }

  lastId = id
}

afterAdd = function afterAdd(code, name) {
  //do nothing -- redefine in page that needs it
}

buzz = function buzz() {
  //do nothing -- override when needed
}