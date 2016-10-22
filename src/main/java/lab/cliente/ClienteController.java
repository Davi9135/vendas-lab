package lab.cliente;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cliente")
public class ClienteController {
  
  @Autowired
  private ClienteService clienteService;
  
  @RequestMapping(value = "/consultar", method = GET)
  public Cliente consultar(@RequestParam Integer codigo) {
    return clienteService.obterCliente(codigo);
  }

  @RequestMapping("/listar")
  public Iterable<Cliente> listar() {
    return clienteService.obterTodos();
  }

  @RequestMapping(value = "/novo", method = POST)
  public Cliente novo(@RequestBody Cliente cliente) {
    return clienteService.registrarCliente(cliente);
  }
  
  @RequestMapping(value = "/deletar", method = POST)
  public void deletar(@RequestBody Integer codigo) {
	  clienteService.delete(codigo);
  } 
  
}