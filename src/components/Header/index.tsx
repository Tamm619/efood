import { HeaderBar } from './styles'
import logo from '../../assets/images/logo.svg'

const Header = () => (
  <HeaderBar>
    <img src={logo} alt="LOGO EFOOD" />
    <h2>
      Viva experiências gastronômicas
      <br />
      no conforto da sua casa
    </h2>
  </HeaderBar>
)

export default Header
