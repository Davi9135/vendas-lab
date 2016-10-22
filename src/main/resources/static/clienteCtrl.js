var compile = null;
var scope = null;

angular.module("vendas").controller("clienteCtrl", function ($scope, $http, $compile) {
		compile = $compile;
		scope = $scope;
		
		// Cadastrar novo cliente.	
		$scope.novoCliente = function (cliente) {
			$http.post("cliente/novo", cliente).success(function (resultadoDoResponse) {				
				// Atualizar a lista com o ultimo usuário cadastrado.
				$('#lista').append($compile(obtemTemplateLista(resultadoDoResponse))($scope));
				limparCampos();
				alert("Cliente cadastrado com sucesso!");				
			});
		};
		
		$scope.deletarCliente = function (codigo) {	
			$http.post("cliente/deletar", codigo).success(function () {	
				removerClienteDeletado(codigo);
				alert("Elemento Deletado!");
			});		
		}; 
		
		// Lista todos os clientes cadastrados.
		$scope.listarClientes = function (cliente) {
			$http.post("cliente/listar").success(function (resultadoDoResponse) {
				carregarTodosClientes(resultadoDoResponse);
			});
		};
		
		// Lista todos os cliente ao iniciar a página.
		$http.post("cliente/listar").success(function (resultadoDoResponse) {
			carregarTodosClientes(resultadoDoResponse);
		});
});

function carregarTodosClientes(listaClientes) {
	$(listaClientes).each(function(index, element){
		$('#lista').append(compile(obtemTemplateLista(element))(scope));				
	});
}

function obtemTemplateLista(cliente) {
	var template = '<div id="coluna" class="col-xs-12 paddinZero">' +
					   '<label name="codigo" class="col-xs-4">'+ cliente.codigo + '</label>' +
					   '<label class="col-xs-4">' + cliente.nome + '</label>' +
					   '<button type="button" class="btn btn-primary col-xs-1"' +
					   'ng-click="deletarCliente(' + cliente.codigo + ', this)">Deletar</button>' +
				   '</div>';
	
	return template;
}

function limparCampos() {
	$('input').each(function(index, element){
		$(element).val('');
	});
}

function removerClienteDeletado(codigo) {
	$('#lista > div').each(function(index, element){
		var codigoElemento = $(element).find('label')[0];
		
		if($(codigoElemento).text() == codigo) {
			$(element).hide();
		}
	});
}