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
		res.send('Seu servidor diz alô!');
	});

				Arquivo web2.js

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



