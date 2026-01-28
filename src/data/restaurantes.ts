import bannerJapa from '../assets/images/japonesa.jpg'
import bannerItalia from '../assets/images/banneritalia.jpg'
import pizza from '../assets/images/pizza.jpg'
import japonesa from '../assets/images/japonesa.jpg'

export type Prato = {
  id: number
  title: string
  description: string
  image: string
}

export type PerfilRestaurante = {
  id: number
  titulo: string
  tipo: string
  capa: string
  pratos: Prato[]
}

export const perfis: PerfilRestaurante[] = [
  {
    id: 1,
    titulo: 'Hioki Sushi',
    tipo: 'Japonesa',
    capa: bannerJapa,
    pratos: [
      {
        id: 1,
        title: 'Sushi',
        description:
          'O sushi é um prato de origem japonesa que se destaca pela sua apresentação delicada e pela experiência leve e agradável que proporciona. É uma opção muito apreciada em todo o mundo, conhecida pelo equilíbrio, pelo visual bem trabalhado e pela sensação de frescor em cada porção.',
        image: japonesa
      },
      {
        id: 2,
        title: 'Sushi',
        description:
          'O sushi é um prato de origem japonesa que se destaca pela sua apresentação delicada e pela experiência leve e agradável que proporciona. É uma opção muito apreciada em todo o mundo, conhecida pelo equilíbrio, pelo visual bem trabalhado e pela sensação de frescor em cada porção.',
        image: japonesa
      }
    ]
  },
  {
    id: 2,
    titulo: 'La Dolce Vita Trattoria',
    tipo: 'Italiana',
    capa: bannerItalia,
    pratos: [
      {
        id: 1,
        title: 'Pizza Marguerita',
        description:
          'A clássica Marguerita: molho de tomate suculento, mussarela derretida...',
        image: pizza
      },
      {
        id: 2,
        title: 'Pizza Marguerita',
        description:
          'A clássica Marguerita: molho de tomate suculento, mussarela derretida...',
        image: pizza
      }
    ]
  }
]
