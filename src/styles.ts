import { createGlobalStyle } from 'styled-components'

export const cores = {
  branca: '#eee',
  preto: '#111',
  cinza: '#333',
  verde: '#10ac84',
  cinzaClaro: '#a3a3a3',
  rosinha: '#ffebd9',
  vermelho: '#E66767',
  fundo: '#fff8f2',
  brancofull: '#fff',
  vermelhohover: '#b33a3a'
}

export const GlobalCss = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
    list-style: none;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: ${cores.brancofull};
    color: ${cores.branca};
    overflow-x: hidden;
  }

  .container{
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;
    padding: 0 16px;
  }
`
