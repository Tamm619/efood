import Tag from '../Tag'
import {
  Card,
  Titulo,
  Descricao,
  Infos,
  Header,
  Avaliacao,
  Body,
  Imagem
} from './styles'
import Button from '../Button'
import estrela from '../../assets/images/estrela.svg'

type Props = {
  title: string
  description: string
  infos: string[]
  image: string
  rating: string
  id: number
}

const Product = ({ description, infos, image, rating, id, title }: Props) => (
  <Card>
    <Imagem src={image} />
    <Infos>
      {infos.map((info) => (
        <Tag key={info}>{info}</Tag>
      ))}
    </Infos>
    <Body>
      <Header>
        <Titulo>{title}</Titulo>
        <Avaliacao>
          {rating}
          <span>
            <img src={estrela} alt="STAR" />
          </span>
        </Avaliacao>
      </Header>
      <Descricao>{description}</Descricao>
      <Button
        type={'link'}
        title={'Clique para ver o restaurante'}
        to={`/perfil/${id}`}
      >
        Saiba mais
      </Button>
    </Body>
  </Card>
)

export default Product
