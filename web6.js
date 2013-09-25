var express = require('express'); // carrega o módulo ExpressJS
var app = new express(); // cria uma instância

app.listen(3000, function() {
	console.log('Escutando na porta 3000');
});

app.get('/', function(req, res) {
	var trataRaiz = require('./raiz');
	res.send(trataRaiz.aviso);
});

app.get('/teste', function(req, res) {
	var trataTeste = require('./teste.js');
	res.send(trataTeste.aloteste);
});

app.get('/multiplica', function(req, res) {
	var meuZ = require('./ze2');
	var valorDeZ = meuZ.saiz;
	res.send('x * y = ' + valorDeZ);
});

