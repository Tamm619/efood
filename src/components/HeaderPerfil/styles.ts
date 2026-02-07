import styled from 'styled-components'
import { cores } from '../../styles'
import pattern from '../../assets/images/banner.jpg'
import { Link } from 'react-router-dom'

export const HeaderBar = styled.header`
  width: 100%;
  background-color: ${cores.rosinha};
  background-image: url(${pattern});
`

export const HeaderContainer = styled.div`
  max-width: 1024px;
  height: 186px;
  margin: 0 auto;
  padding: 24px 16px;

  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;

  img {
    justify-self: center;
  }

  @media (max-width: 768px) {
    height: auto;
    padding: 16px;

    grid-template-columns: 1fr auto;
    grid-template-areas:
      'back cart'
      'logo logo';

    img {
      grid-area: logo;
      justify-self: center;
      margin: 0 auto;
    }
    row-gap: 12px;
  }
`

export const CartButton = styled.span`
  justify-self: end;

  display: flex;
  align-items: center;
  gap: 8px;

  cursor: pointer;
  color: #e66767;
  font-size: 20px;
  font-weight: 700;

  @media (max-width: 768px) {
    grid-area: cart;
    font-size: 16px;
  }

  img {
    width: 20px;
    height: 20px;
    filter: brightness(0) saturate(100%) invert(53%) sepia(42%) saturate(693%)
      hue-rotate(323deg) brightness(93%) contrast(92%);
  }

  &:hover {
    opacity: 0.85;
  }
`

export const LinkRestaurantes = styled(Link)`
  display: inline-block;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  color: ${cores.vermelho};
  cursor: pointer;

  @media (max-width: 768px) {
    grid-area: back;
    font-size: 18px;
  }

  &:hover {
    text-decoration: underline;
    transform: scale(1.05);
    transform-origin: center center;
    transition: all 0.2s ease;
    color: ${cores.vermelhohover};
  }
`
