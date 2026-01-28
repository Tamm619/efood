import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { abrir } from '../../store/reducers/carrinho'

import {
  HeaderBar,
  HeaderContainer,
  LinkRestaurantes,
  CartButton
} from './styles'
import logo from '../../assets/images/logo.svg'
import cartIcon from '../../assets/images/cart.svg'

const HeaderPerfil = () => {
  const dispatch = useDispatch()
  const itens = useSelector((state: RootState) => state.carrinho.itens)

  return (
    <HeaderBar>
      <HeaderContainer>
        <LinkRestaurantes to="/">← Restaurantes</LinkRestaurantes>

        <img src={logo} alt="LOGO EFOOD" />

        <CartButton
          role="button"
          tabIndex={0}
          onClick={() => dispatch(abrir())}
          onKeyDown={(e) => e.key === 'Enter' && dispatch(abrir())}
        >
          <img src={cartIcon} alt="Carrinho" />
          <span>{itens.length} produto(s) no carrinho</span>
        </CartButton>
      </HeaderContainer>
    </HeaderBar>
  )
}

export default HeaderPerfil
