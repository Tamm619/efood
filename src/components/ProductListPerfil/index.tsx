import { ApiProduto } from '../../services/api'
import ProductPerfil from '../ProductPerfil'
import { Container } from '../ProductsList/styles'
import { ListPerfil } from './styles'

type Props = {
  cardapio: ApiProduto[]
  onSelectProduto: (produto: ApiProduto) => void
}

const ProductsListPerfil = ({ cardapio, onSelectProduto }: Props) => (
  <Container>
    <div className="container">
      <ListPerfil>
        {cardapio.map((produto) => (
          <ProductPerfil
            key={produto.id}
            title={produto.nome}
            description={produto.descricao}
            image={produto.foto}
            onClick={() => onSelectProduto(produto)}
          />
        ))}
      </ListPerfil>
    </div>
  </Container>
)

export default ProductsListPerfil
