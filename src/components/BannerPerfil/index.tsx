import { Banner, BannerContainer } from './styles'

type Props = {
  capa: string
  titulo: string
  tipo: string
}

const BannerPerfil = ({ capa, titulo, tipo }: Props) => (
  <Banner style={{ backgroundImage: `url(${capa})` }}>
    <BannerContainer>
      <span>{tipo}</span>
      <h1>{titulo}</h1>
    </BannerContainer>
  </Banner>
)

export default BannerPerfil
