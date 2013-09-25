var express = require('express'); // carrega o módulo ExpressJS
var app = new express(); // cria uma instância

var trataRaiz = require('./raiz');
var trataTeste = require('./teste.js');
var meuZ = require('./ze2');

app.listen(3000, function() {
	console.log('Escutando na porta 3000');
});

app.get('/', function(req, res) {
	res.send(trataRaiz.aviso);
});

app.get('/teste', function(req, res) {
	res.send(trataTeste.aloteste + meuZ.saiz);
});

app.get('/multiplica', function(req, res) {
	var valorDeZ = meuZ.saiz;
	res.send('x * y = ' + valorDeZ);
});

