package lab.produto;

import java.util.Date;

import org.springframework.data.repository.CrudRepository;

public interface ProdutoRepository extends CrudRepository<Produto, Integer> {
  public Iterable<Produto> findByDataGreaterThan(Date data);
  public Iterable<Produto> findByQuantidadeGreaterThan(Integer quantidade);
  public Produto findOneByCodigo(Integer codigo);
  public void delete(Integer codigo);
}