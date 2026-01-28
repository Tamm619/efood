import styled from 'styled-components'

export const Banner = styled.div`
  height: 280px;
  background-size: cover;
  background-position: center;
  position: relative;

  display: flex;

  /* overlay escuro por cima da imagem */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
`

export const BannerContainer = styled.div`
  position: relative; /* fica acima do overlay */
  z-index: 1;

  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 32px 16px;
  color: #fff;

  justify-content: space-between;

  span {
    position: relative;
    font-size: 32px;
    font-weight: 100;
    display: flex;
    margin-bottom: 152px;
  }

  h1 {
    position: relative;
    font-size: 32px;
    font-weight: 800;
    margin: 0;
  }
`
