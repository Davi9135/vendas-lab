var compile = null;
var scope = null;

angular.module("vendas").controller("produtoCtrl", function ($scope, $http, $compile) {
	compile = $compile;
	scope = $scope;
	
	// Lista todos os produtos ao iniciar a página.
	$http.post("produto/listar").success(function (resultadoDoResponse) {			
		carregarTodosProdutos(resultadoDoResponse);			
	});	
	
	$scope.deletarProduto = function (codigo) {	
		$http.post("produto/deletar", codigo).success(function () {	
			removerElementoDeletado(codigo);
			alert("Elemento Deletado!");
		});		
	}; 
	
	// Cadastrar um novo produto.
	$scope.novoProduto = function (produto) {
		$http.post("produto/novo", produto).success(function (resultadoDoResponse) {			
			// Atualizar a lista com o ultimo usuário cadastrado.
			$('#lista').append($compile(obtemTemplateListaProduto(resultadoDoResponse))($scope));
			limparCampos();
			alert("Produto cadastrado com sucesso!");
		});
	};
	
	// listar todos os produtos.
	$scope.listarTodosProduto = function () {
		$http.post("produto/listar").success(function (resultadoDoResponse) {			
			carregarTodosProdutos(resultadoDoResponse);	
			alert("Todos");
		});
	};	
});

function carregarTodosProdutos(listaProduto) {
	$(listaProduto).each(function(index, element){
		$('#lista').append(compile(obtemTemplateListaProduto(element))(scope));				
	});
}

function obtemTemplateListaProduto(produto) {
	var template = '<div id="coluna" class="col-xs-12 paddinZero">' +
					   '<label name="codigo" class="col-xs-2">'+ produto.codigo + '</label>' +
					   '<label class="col-xs-3">' + produto.nome + '</label>' +
					   '<label class="col-xs-3">' + produto.tipo +'</label>' +
					   '<label class="col-xs-2">' + produto.quantidade + '</label>' +				
					   '<button type="button" class="btn btn-primary col-xs-1"' +
					   'ng-click="deletarProduto(' + produto.codigo + ', this)">Deletar</button>' +
				   '</div>';
	
	return template;
}

function limparCampos() {
	$('input').each(function(index, element){
		$(element).val('');
	});
}


function removerElementoDeletado(codigo) {
	$('#lista > div').each(function(index, element){
		var codigoElemento = $(element).find('label')[0];
		
		if($(codigoElemento).text() == codigo) {
			$(element).hide();
		}
	});
}