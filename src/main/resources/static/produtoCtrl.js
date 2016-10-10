angular.module("vendas").controller("produtoCtrl", function ($scope, $http) {
	// Cadastrar um novo produto.
	$scope.novoProduto = function (produto) {
		$http.post("produto/novo", produto).success(function (resultadoDoResponse) {			
			// Atualizar a lista com o ultimo usuário cadastrado.
			$('#lista').append(obtemTemplateLista(resultadoDoResponse));
			limparCampos();
			alert("Produto cadastrado com sucesso!");
		});
	};
	
	// listar todos os produtos.
	$scope.listarTodosProduto = function () {
		$http.post("produto/listar").success(function (resultadoDoResponse) {			
			carregarTodosProdutos(resultadoDoResponse);			
		});
	};	
	
	// Lista todos os produtos ao iniciar a página.
	$http.post("produto/listar").success(function (resultadoDoResponse) {			
		carregarTodosProdutos(resultadoDoResponse);			
	});	
});

function carregarTodosProdutos(listaProduto) {
	$(listaProduto).each(function(index, element){
		$('#lista').append(obtemTemplateLista(element));				
	});
}

function obtemTemplateLista(produto) {
	var template = '<div id="coluna" class="col-xs-12 paddinZero">' +
					   '<label class="col-xs-3">'+ produto.codigo + '</label>' +
					   '<label class="col-xs-3">' + produto.nome + '</label>' +
					   '<label class="col-xs-3">' + produto.tipo +'</label>' +
					   '<label class="col-xs-3">' + produto.quantidade + '</label>' +
				   '</div>';
	
	return template;
}

function limparCampos() {
	$('input').each(function(index, element){
		$(element).val('');
	});
}