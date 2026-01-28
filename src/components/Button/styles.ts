import styled from 'styled-components'
import { cores } from '../../styles'
import { Link } from 'react-router-dom'

export const ButtonContainer = styled.button`
  border: none;
  color: ${cores.rosinha};
  background-color: ${cores.vermelho};
  font-size: 14px;
  font-weight: bold;
  padding: 4px 6px;
`

export const ButtonLink = styled(Link)`
  border: none;
  color: ${cores.rosinha};
  background-color: ${cores.vermelho};
  font-size: 14px;
  font-weight: bold;
  padding: 4px 6px;
  text-decoration: none;
  display: inline-block;

  &:hover {
    opacity: 0.9;
    transform: scale(1.05);
  }
`
