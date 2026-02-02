import styled from 'styled-components'
import { cores } from '../../styles'

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9999;
`

export const Aside = styled.aside`
  position: absolute;
  top: 0;
  right: 0;
  width: 360px;
  height: 100%;
  background: ${cores.vermelho};
  padding: 16px;
  overflow-y: auto;
`

export const Lista = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

export const Item = styled.li`
  background: ${cores.rosinha};
  padding: 8px;
  margin-bottom: 16px;
  display: grid;
  grid-template-columns: 80px 1fr 24px;
  gap: 8px;
  align-items: center;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    display: block;
  }

  h4 {
    margin: 0 0 6px 0;
    font-size: 14px;
    color: ${cores.vermelho};
  }

  p {
    margin: 0;
    color: ${cores.vermelho};
    font-size: 14px;
  }

  button {
    border: 0;
    background: transparent;
    cursor: pointer;
    color: ${cores.vermelho};
    font-size: 18px;
  }
`

export const Resumo = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${cores.rosinha};
  font-weight: bold;
  margin-top: 24px;
  margin-bottom: 16px;
`

export const Botao = styled.button`
  width: 100%;
  border: 0;
  cursor: pointer;
  padding: 8px;
  font-weight: bold;
  background: ${cores.rosinha};
  color: ${cores.vermelho};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const BotaoSecundario = styled.button`
  width: 100%;
  border: 0;
  cursor: pointer;
  padding: 8px;
  font-weight: bold;
  background: ${cores.rosinha};
  color: ${cores.vermelho};
  margin-top: 8px;
`

export const Titulo = styled.h3`
  margin: 0 0 12px 0;
  color: ${cores.rosinha};
  font-size: 16px;
  font-weight: 700;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    color: ${cores.rosinha};
    font-size: 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  input {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    height: 32px;
    border: 0;
    padding: 0 8px;
    background: ${cores.rosinha};
    color: ${cores.vermelho};
    font-weight: 600;
    outline: none;
  }
`

export const Grid2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`

export const Texto = styled.p`
  color: ${cores.rosinha};
  font-size: 12px;
  line-height: 1.6;
  margin: 0 0 16px 0;
`

// ✅ mensagens de validação
export const Erro = styled.small`
  color: ${cores.brancofull};
  font-size: 11px;
  line-height: 1.2;
`
