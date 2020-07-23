const express = require('express'); 
const app = express(); 

app.use(express.static('./dist/adc-front'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/adc-front/'}
  );
  });

app.listen(process.env.PORT || 8080);