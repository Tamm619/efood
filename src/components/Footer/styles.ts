import styled from 'styled-components'
import { cores } from '../../styles'

export const Container = styled.footer`
  width: 100%;
  background-color: ${cores.rosinha};
  padding: 40px 0;

  .container {
    max-width: 1024px;
    margin: 0 auto;
    text-align: center;
  }

  p {
    margin-top: 16px;
    font-size: 10px;
    color: ${cores.vermelho};
    line-height: 1.6;
  }

  .links {
    margin: 24px 0;

    a {
      margin: 0 8px;
    }
  }
`
