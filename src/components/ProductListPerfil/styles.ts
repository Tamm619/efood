import styled from 'styled-components'

export const ListPerfil = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  max-width: 1024px;
  margin: 56px auto 0;
  padding: 0;
  list-style: none;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* 1 produto por vez */
  }
`
