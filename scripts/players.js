players = ('Lorelei Claire Zo&euml; Hannah Anna Jason Griffin Olivia').split(' ')

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


playersCodes = {}
codesPlayers = {}
codesSounds = {}

$(players).each(function(i) {
  playersCodes[players[i]] = codes[i]
  codesPlayers[codes[i]] = players[i]
  codesSounds[codes[i]] = sounds[i]
})

buzzDisplay = '<div class="row" data-keystroke="thekey"> <h1>name</h1><audio src="/media/noise"></audio></div>'
playerDisplay = '<div class="col-md-1" data-keystroke="thekey">name<br><span class="score">0</span></div>'