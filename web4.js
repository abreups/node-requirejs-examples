var express = require('express'); // carrega o módulo ExpressJS
var app = new express(); // cria uma instância

app.listen(3000, function() {
	console.log('Escutando na porta 3000');
});

app.get('/', function(req, res) {
	/*
	 *
	 *
	 *
	 *
	 *  Faz uma série de coisas
	 *
	 *
	 *
	 *
	 *
	 */
	var aviso = 'Seu servidor diz alô!';
	res.send(aviso);
});

app.get('/teste', function(req, res) {
	/*
	 *
	 *
	 *
	 *
	 * Faz uma outra série de coisas
	 *
	 *
	 *
	 *
	 *
	 *
	 */
 	var aloteste = '<h1>A página de teste do seu servidor diz alô!</h1>';
	res.send(aloteste);
});

app.get('/multiplica', function(req, res) {
	var x = 5;
	var y = 3;
	/*
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *  Faz mais um monte de coisas complicadas
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 */
	var z = x * y;
	res.send('x * y = ' + z);
});

