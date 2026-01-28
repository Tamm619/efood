import styled from 'styled-components'
import { cores } from '../../styles'

export const Card = styled.li`
  list-style: none;
  background-color: ${cores.vermelho};
  padding: 8px;
  color: ${cores.brancofull};

  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const Foto = styled.img`
  width: 100%;
  height: 167px;
  object-fit: cover;
  display: block;
`

export const Titulo = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 800;
`

export const Descricao = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
`

export const Botao = styled.button`
  margin-top: auto;
  width: 100%;
  height: 24px;
  border: 0;
  cursor: pointer;

  background-color: ${cores.rosinha};
  color: ${cores.vermelho};
  font-size: 14px;
  font-weight: 700;
`
