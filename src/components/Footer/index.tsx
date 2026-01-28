import { Container } from './styles'
import twitter from '../../assets/images/X.svg'
import facebook from '../../assets/images/face.svg'
import instagram from '../../assets/images/instagram.svg'
import logo from '../../assets/images/logo.svg'
import { Link } from 'react-router-dom'

const Footer = () => (
  <Container>
    <div className="container">
      <img src={logo} alt="LOGO EFOOD" />
      <div className="links">
        <Link to="/">
          <img src={twitter} alt="X" />
        </Link>
        <Link to="/">
          <img src={instagram} alt="Instagram" />
        </Link>
        <Link to="/">
          <img src={facebook} alt="Facebook" />
        </Link>
      </div>
      <p>
        A efood é uma plataforma para divulgação de estabelecimentos, a
        responsabilidade pela entrega, qualidade
        <br />
        dos produtos é toda do estabelecimento contratado.
      </p>
    </div>
  </Container>
)

export default Footer
