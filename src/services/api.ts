export type ApiProduto = {
  title: string
  image: string
  description: string
  id: number
  nome: string
  descricao: string
  foto: string
  preco: number
  porcao: string
}

export type ApiRestaurante = {
  id: number
  titulo: string
  avaliacao: number
  descricao: string
  tipo: string
  capa: string
  cardapio: ApiProduto[]
}

export async function getRestaurantes(): Promise<ApiRestaurante[]> {
  const res = await fetch('https://api-ebac.vercel.app/api/efood/restaurantes')

  if (!res.ok) {
    throw new Error('Falha ao buscar restaurantes')
  }

  return res.json()
}
