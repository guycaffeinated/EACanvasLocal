import http.server, os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
http.server.test(HandlerClass=http.server.SimpleHTTPRequestHandler, port=8080, bind='127.0.0.1')
