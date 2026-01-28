import styled from 'styled-components'
import { cores } from '../../styles'

export const Card = styled.div`
  position: relative;
  width: 100%;
  max-width: 472px;
  margin-bottom: 40px;
  overflow: hidden;
`

export const Titulo = styled.h3`
  font-weight: bold;
  font-size: 16px;
  display: block;
`

export const Descricao = styled.p`
  font-size: 14px;
  line-height: 22px;
  margin-top: 8px;
  margin-bottom: 8px;

  display: -webkit-box;
  -webkit-line-clamp: 3; /* número de linhas */
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const Infos = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  margin-bottom: 8px;
  width: 100%;
`

export const Avaliacao = styled.span`
  color: ${cores.vermelho};
  font-weight: bold;
  font-size: 18px;
  display: flex;
  align-items: center;

  span {
    margin-left: 4px;
  }
`

export const Body = styled.div`
  border: 1px solid ${cores.vermelho};
  border-top: none;
  background-color: ${cores.brancofull};
  color: ${cores.vermelho};
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const Imagem = styled.img`
  display: block;
  width: 100%;
  height: 217px;
  object-fit: cover;
`
