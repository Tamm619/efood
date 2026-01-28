import styled from 'styled-components'
import { cores } from '../../styles'
import banner from '../../assets/images/banner.jpg'

export const HeaderBar = styled.header`
  width: 100%;
  height: 320px;
  background-image: url(${banner});
  padding: 24px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  h2 {
    width: 100%; // ESTE
    max-width: 539px; // ESTE
    margin: 0 auto; // ESTE
    text-align: center;
    color: ${cores.vermelho};
    font-weight: 900;
    font-size: 24px;
  }
`
