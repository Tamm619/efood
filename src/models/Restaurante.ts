class Restaurante {
  description: string
  image: string
  infos: string[]
  title: string
  id: number
  rating: string

  constructor(
    id: number,
    description: string,
    image: string,
    infos: string[],
    title: string,
    rating: string
  ) {
    this.id = id
    this.description = description
    this.image = image
    this.infos = infos
    this.title = title
    this.rating = rating
  }
}

export default Restaurante
