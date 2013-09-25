Esse texto e os exemplos apresentados foram baseados no exemplo de 
rgarcia/node-requirejs-examples.

Esse texto parte do princípio de que você está trabalhando
num micro com Linux.


RequireJS no servidor

Existem muitos exemplos e tutoriais na Internet que mostram como
usar o RequireJS no cliente, isto é, carregado pelo navegador
(ou browser).
É típico desses exemplos mostrar que o RequireJS é carregado
pelo navegador através da seguinte linha na tag script:

	<script data-main="scripts/main" src="scripts/require.js"></script>

ou algo muito parecido.

No entanto, encontrei muito poucos exemplos de como usar o RequireJS
do lado do servidor, com Node JS.
Ou seja, a página web carregada pelo navegador não vai ter um monte de
tags script carregando vários scripts em JavaScript. Quem tem que fazer
isso é o servidor, que está rodando programas em JavaScript através 
do Node JS.
Então não faz muito sentido que o navegador carregue o RequireJS,
pois será o servidor Node JS quem tem que carregar vários módulos,
e não o cliente (o navegador).

OK, então como usamos o RequireJS no servidor?

Vamos começar com um programa bem simples que inicia um
servidor web e usa o ExpressJS para cuidar das rotas (tais como
quando o navegador tenta acessar a página raiz '/').
Se você não conhece nada de ExpressJS recomendo o livro
"Express Web Application Development", de Hage Yaapa, Editora
Packet Publishing.

Nosso arquivo vai se chamar web1.js e seu conteúdo é o seguinte:

	var express = require('express'); // carrega o módulo ExpressJS
	var app = new express(); // cria uma instância

	app.listen(3000, function() {
		console.log('Escutando na porta 3000');
	});

					Arquivo web1.js	

Se você tentar executar esse arquivo com NodeJS você vai receber uma
mensagem de erro de que 'express' não foi encontrado.
Claro, se você está começando "do zero", você tem que instalar
o ExpressJS com o npm, assim:

	npm install express

Depois do download você vai ter um diretório chamado 'node_modules'
e lá dentro você vai ter um outro chamado 'express', que é onde
tudo do ExpressJS está carregado.
Agora sim você pode dar o comando:

	node web1.js

Se tudo estiver ok você vai ver a mensagem no terminal "Escutando
na porta 3000" e mais nada.

Abra um navegador qualquer e digite a URL 

	http://localhost:3000

Você deverá receber uma resposta do tipo "Cannot GET /".
Isso significa que tivemos sucesso! Isto é, seu navegador
solicitou a página raiz '/' para seu servidor web (nosso
web1.js), só que nosso servidor web não sabe o que fazer 
com essa solicitação, pois não há nenhum código que indique
como tratar a solicitação para '/'.

Vamos entrar criar uma resposta para o acesso à página raiz '/'.
Copie o arquivo web1.js com o nome de web2.js e edite-o assim:

	var express = require('express'); // carrega o módulo ExpressJS
	var app = new express(); // cria uma instância

	app.listen(3000, function() {
		console.log('Escutando na porta 3000');
	});

	app.get('/', function(req, res) {
		var aviso = 'Seu servidor diz alô!';
		res.send(aviso);
	});

	//			Arquivo web2.js

Execute com o comando

	node web2.js

Você vai ver a mensagem "Escutando na porta 3000" no terminal
e mais nada.
Abrar o navegador e acesse novamente a URL

	http://localhost:3000

E você deverá ver na janela do navegar a mensagem "Seu servidor 
diz alô!".

O que aconteceu foi que 'app.get()' do Express trata o acesso
feito pelo navegador usando o verbo GET do protocolo HTML, e o
primeiro parâmetro ('/') diz qual caminho dever ser tratado
(o termo apropriado é "rota").
A título de experiência tente acessar a seguinte URL:

	http://localhost:3000/teste

e você vai receber a infame resposta: "Cannot GET /teste".
Faz sentido, não? Pois nosso código não diz o que é para ser
feito quando acessamos '/teste'; ele só trata o acesso a '/'.

E como fazemos para a aplicação responder ao acesso a '/teste'?
Basta incluir essa rota em uma outra linha com 'app.get()', assim:

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

	//			Arquivo web3.js

Rode 'node web3' e dê refresh na URL 'localhost:3000/teste'
Note que inserimos a tag HTML <h1> no texto enviado ao navegador e
você provavelmente vai ver a mensagem com caracteres maiores
na janela do seu browser.

Muito bem. Até agora tivemos uma passada rápida na funcionaliade
de rotas do Express.
Agora imagine que seu código vai crescendo, você vai acrescentando
mais funções e as linhas de código vão aumentando e ele vai ficando
bem feinho, parecendo uma linguiça enorme de linhas de código. Algo
bem pior do que o código abaixo:

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

	//			Arquivo web4.js


Veja que já está ficando difícil de ler o código e quanto mais
ele cresce pior fica para visualizar as coisas e por consequência,
entendê-las.
Será que tem um jeito de colocar os códigos que estão dentro
das chamadas 'app.get()' em um outro lugar e chamá-los como
uma "função" ou algo parecido?
Com certeza, e o NodeJS pode fazer isso usando 'exports'.
(Calma, não chegamos no RequireJS ainda; mas é importante entender
esses conceitos do 'exports').


NodeJS exports

Primeiro vamos pegar (quase) todo o código da rota '/multiplica'
e colocá-lo em um arquivo separado. Ao invés de chamar esse arquivo
de 'multiplica.js' vamos denominá-lo de "Zé.js" (pra quem está no começo
acho confuso esse negócio do arquivo ter o mesmo nome da variável
que tem o mesmo nome da função, etc. Vamos radicalizar).

Nosso arquivo 'ze1.js' (em minúsculas e sem o acento) fica assim:

	var x = 5;
	var y = 3;
	/*
	 *
	 *  Faz mais um monte de coisas complicadas
	 *
	 *
	 */
	var z = x * y;

	//					Arquivo ze1.js

Acabamos de criar um módulo no NodeJS (bem... quase).
Agora temos que dar um jeito da variável 'z' ser "exportada" para
fora desse módulo, caso contrário ela só existe no escopo do módulo,
o que não é muito útil pra gente.
Para "exportar" a variável 'z' usamos a seguinte linha de código:

	module.exports.saiz = z;

Essa linha diz o seguinte: "Ô módulo, exporta a variável 'z' e
passa ela pro mundo exterior com o nome de 'saiz'".
Nosso módulo fica então assim:

	var x = 5;
	var y = 3;
	/*
	 *
	 *  Faz mais um monte de coisas complicadas
	 *
	 *
	 */
	var z = x * y;
	module.exports.saiz = z;

	//					Arquivo ze2.js

Agora voltemos no código da rota '/multiplica' e usemos esse módulo.
A parte do código fica assim:

	.
	.
	.
	app.get('/soma', function(req, res) {
		var meuZ = require('./ze2');
		var valorDeZ = meuZ.saiz;
		res.send('x + y = ' + valorDeZ);
	});
	.
	.
	.

A linha:

	var meuZ = require('./ze2'); 

usa o comando 'require' do próprio NodeJS para carregar o módulo 'ze2.js'
na variável 'meuZ'.
Aí, na linha de baixo usamos 'meuZ' como uma "chamada de função" e pedimos
o valor 'saiz', que é o nome que o mundo exterior conhece desse módulo.
Finalmente mandamos para a janela do navegador 'valorDeZ'.
Coloquemos então esse código em nosso arquivo web4.js salvando-o agora
como web5.js:

	var express = require('express'); // carrega o módulo ExpressJS
	var app = new express(); // cria uma instância

	app.listen(3000, function() {
		console.log('Escutando na porta 3000');
	});

	app.get('/', function(req, res) {
		/*
		 *
		 *
		 *  Faz uma série de coisas
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
		 * Faz uma outra série de coisas
		 *
		 *
		 */
		var aloteste = '<h1>A página de teste do seu servidor diz alô!</h1>';
		res.send(aloteste);
	});

	app.get('/multiplica', function(req, res) {
		var meuZ = require('./ze2');
		var valorDeZ = meuZ.saiz;
		res.send('x * y = ' + valorDeZ);
	});

	//			Arquivo web5.js



