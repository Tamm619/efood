import { useEffect, useState } from 'react'

import Header from '../../components/Header'
import ProductsList from '../../components/ProductsList'

import Restaurante from '../../models/Restaurante'
import { getRestaurantes } from '../../services/api'

const Home = () => {
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    async function carregarRestaurantes() {
      try {
        setCarregando(true)
        setErro('')

        const data = await getRestaurantes()

        const adaptados: Restaurante[] = data.map((r) => ({
          id: r.id,
          title: r.titulo,
          description: r.descricao,
          image: r.capa,
          infos: [r.tipo],
          rating: r.avaliacao.toFixed(1)
        }))

        setRestaurantes(adaptados)
      } catch {
        setErro('Não foi possível carregar os restaurantes.')
      } finally {
        setCarregando(false)
      }
    }

    carregarRestaurantes()
  }, [])

  return (
    <>
      <Header />

      <main style={{ backgroundColor: '#fff1e6' }}>
        {carregando && (
          <div
            className="container"
            style={{ minHeight: '400px', color: '#000' }}
          >
            <p>Carregando...</p>
          </div>
        )}

        {erro && (
          <div className="container">
            <p>{erro}</p>
          </div>
        )}

        {!carregando && !erro && <ProductsList restaurantes={restaurantes} />}
      </main>
    </>
  )
}

export default Home
