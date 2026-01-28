import styled from 'styled-components'
import { cores } from '../../styles'

export const Container = styled.section`
  padding: 32px 0;
  background-color: ${cores.fundo};
`

export const List = styled.ul`
  width: 100%;
  max-width: 1024px;
  display: grid;
  grid-template-columns: repeat(2, 472px);
  gap: 40px;
  justify-content: center;
  margin: 0;
  padding: 0;
`

export const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
`
