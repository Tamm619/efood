import React, { useState } from 'react'
import * as S from './styles'
import { ApiProduto } from '../../services/api'

type Props = {
  produto: ApiProduto
  onClose: () => void
  onAddToCart?: (produto: ApiProduto) => void
}

const ProductModal = ({ produto, onClose, onAddToCart }: Props) => {
  const [isAdding, setIsAdding] = useState(false)

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose()
  }

  function handleAdd() {
    if (isAdding) return
    setIsAdding(true)

    onAddToCart?.(produto)

    onClose()

    setTimeout(() => setIsAdding(false), 250)
  }

  return (
    <S.Overlay onClick={handleOverlayClick}>
      <S.Modal>
        <S.CloseButton type="button" aria-label="Fechar" onClick={onClose}>
          x
        </S.CloseButton>

        <S.Content>
          <S.Image src={produto.foto} alt={produto.nome} />

          <S.Info>
            <h3>{produto.nome}</h3>
            <p>{produto.descricao}</p>
            <small>Serve: {produto.porcao}</small>

            <S.AddButton type="button" onClick={handleAdd} disabled={isAdding}>
              {isAdding
                ? 'Adicionando...'
                : `Adicionar ao carrinho - R$ ${produto.preco.toFixed(2)}`}
            </S.AddButton>
          </S.Info>
        </S.Content>
      </S.Modal>
    </S.Overlay>
  )
}

export default ProductModal
