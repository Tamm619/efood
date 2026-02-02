import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ApiProduto } from '../../services/api'

export type CarrinhoItem = ApiProduto & {
  cartId: string
}

type CarrinhoState = {
  itens: CarrinhoItem[]
  isOpen: boolean
}

const initialState: CarrinhoState = {
  itens: [],
  isOpen: false
}

const carrinhoSlice = createSlice({
  name: 'carrinho',
  initialState,
  reducers: {
    abrir: (state) => {
      state.isOpen = true
    },
    fechar: (state) => {
      state.isOpen = false
    },
    adicionar: (state, action: PayloadAction<ApiProduto>) => {
      const item: CarrinhoItem = {
        ...action.payload,
        cartId: crypto.randomUUID()
      }
      state.itens.push(item)
      state.isOpen = true
    },
    remover: (state, action: PayloadAction<string>) => {
      state.itens = state.itens.filter((item) => item.cartId !== action.payload)
    },
    limpar: (state) => {
      state.itens = []
    }
  }
})

export const { abrir, fechar, adicionar, remover, limpar } =
  carrinhoSlice.actions

export default carrinhoSlice.reducer
