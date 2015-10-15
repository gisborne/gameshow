ROOT = File.dirname(__FILE__)
AdminPage = [File.read(ROOT + '/admin.html')]
ResultPage = [File.read(ROOT + '/display.html')]

App = proc do |e|
  req = Rack::Request.new e
  path = e['REQUEST_PATH'].split('/').compact[1..-1]

  if path && path.first == 'admin'
    [200, {'Content-Type' => 'text/html'}, AdminPage]
  else
    [200, {'Content-Type' => 'text/html'}, ResultPage]
  end
end

use Rack::Static, urls: ['/scripts', '/css', '/media']

run App
