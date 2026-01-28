import styled from 'styled-components'
import { cores } from '../../styles'

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  z-index: 9999;
`

export const Modal = styled.div`
  position: relative;
  width: 100%;
  max-width: 920px;
  background: ${cores.vermelho}; /* ajuste se for outra cor no figma */
  padding: 32px;
`

export const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  border: 0;
  background: transparent;
  font-size: 28px;
  cursor: pointer;
  color: ${cores.brancofull};
`

export const Content = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const Image = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
`

export const Info = styled.div`
  color: ${cores.brancofull};

  h3 {
    margin: 0 0 12px;
    font-size: 18px;
    font-weight: 900;
  }

  p {
    margin: 0 0 12px;
    line-height: 1.4;
  }

  small {
    display: block;
    margin-bottom: 16px;
  }
`

export const AddButton = styled.button`
  border: 0;
  cursor: pointer;
  padding: 8px 12px;
  font-weight: 700;
  background: ${cores.brancofull};
  color: ${cores.vermelho};
`
