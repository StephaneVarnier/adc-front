app.use(express.static('./dist/adc-front'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/adc-front/'}
  );
  });

app.listen(process.env.PORT || 8080);