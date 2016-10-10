angular.module("vendas").controller("clienteCtrl", function ($scope, $http) {
		// Cadastrar novo cliente.	
		$scope.novoCliente = function (cliente) {
			$http.post("cliente/novo", cliente).success(function (resultadoDoResponse) {				
				// Atualizar a lista com o ultimo usuário cadastrado.
				$('#lista').append(obtemTemplateLista(resultadoDoResponse));
				limparCampos();
				alert("Cliente cadastrado com sucesso!");				
			});
		};
		
		// Lista todos os clientes cadastrados.
		$scope.listarClientes = function (cliente) {
			$http.post("cliente/listar").success(function (resultadoDoResponse) {
				carregarTodosProdutos(resultadoDoResponse);
			});
		};
		
		// Lista todos os cliente ao iniciar a página.
		$http.post("cliente/listar").success(function (resultadoDoResponse) {
			carregarTodosProdutos(resultadoDoResponse);
		});
});

function carregarTodosProdutos(listaClientes) {
	$(listaClientes).each(function(index, element){
		$('#lista').append(obtemTemplateLista(element));				
	});
}

function obtemTemplateLista(cliente) {
	var template = '<div id="coluna" class="col-xs-12 paddinZero">' +
					   '<label class="col-xs-6">'+ cliente.codigo + '</label>' +
					   '<label class="col-xs-6">' + cliente.nome + '</label>' +
				   '</div>';
	
	return template;
}

function limparCampos() {
	$('input').each(function(index, element){
		$(element).val('');
	});
}