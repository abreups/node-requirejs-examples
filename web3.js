var express = require('express'); // carrega o módulo ExpressJS
var app = new express(); // cria uma instância

app.listen(3000, function() {
	console.log('Escutando na porta 3000');
});

app.get('/', function(req, res) {
	var aviso = 'Seu servidor diz alô!';
	res.send(aviso);
});

app.get('/teste', function(req, res) {
	var aloteste = '<h1>A página de teste do seu servidor diz alô!</h1>';
	res.send(aloteste);
});

