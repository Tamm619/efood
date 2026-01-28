import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { adicionar } from '../../store/reducers/carrinho'

import HeaderPerfil from '../../components/HeaderPerfil'
import BannerPerfil from '../../components/BannerPerfil'
import ProductsListPerfil from '../../components/ProductListPerfil'
import ProductModal from '../../components/ProductModal'

import { ApiProduto, getRestaurantes } from '../../services/api'

type RestaurantePerfil = {
  id: number
  titulo: string
  tipo: string
  capa: string
  cardapio: ApiProduto[]
}

const Perfil = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const [perfil, setPerfil] = useState<RestaurantePerfil | null>(null)
  const [produtoSelecionado, setProdutoSelecionado] =
    useState<ApiProduto | null>(null)

  useEffect(() => {
    async function carregarPerfil() {
      const data = await getRestaurantes()
      const encontrado = data.find((r) => r.id === Number(id))

      if (encontrado) {
        setPerfil(encontrado)
      }
    }

    carregarPerfil()
  }, [id])

  if (!perfil) return <div>Restaurante não encontrado</div>

  return (
    <>
      <HeaderPerfil />

      <BannerPerfil
        capa={perfil.capa}
        tipo={perfil.tipo}
        titulo={perfil.titulo}
      />

      <ProductsListPerfil
        cardapio={perfil.cardapio}
        onSelectProduto={(produto) => setProdutoSelecionado(produto)}
      />

      {produtoSelecionado && (
        <ProductModal
          produto={produtoSelecionado}
          onClose={() => setProdutoSelecionado(null)}
          onAddToCart={(produto) => dispatch(adicionar(produto))}
        />
      )}
    </>
  )
}

export default Perfil
