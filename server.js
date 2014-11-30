var http = require('http'),
  connect = require('connect');

var app = connect()
        .use(connect.static('dist'));

  http.createServer(app).listen(process.env.PORT || 5000);
