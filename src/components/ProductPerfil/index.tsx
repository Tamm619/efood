import { Card, Foto, Titulo, Descricao, Botao } from './styles'

type Props = {
  title: string
  description: string
  image: string
  onClick: () => void
}

const ProductPerfil = ({ title, description, image, onClick }: Props) => (
  <Card>
    <Foto src={image} alt={title} />
    <Titulo>{title}</Titulo>
    <Descricao>{description}</Descricao>

    <Botao type="button" onClick={onClick}>
      Ver detalhes
    </Botao>
  </Card>
)

export default ProductPerfil
