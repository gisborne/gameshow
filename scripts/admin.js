var client = new Faye.Client('http://localhost:9292/')
$('#foo-submit').click(function() {
  client.publish('/msg', $('#foo').val())
})