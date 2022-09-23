export interface ProductItemWithQty {
  product: {
    id: number
    img_src?: string
    desc?: string
    name: string
    price: number
  }
  qty: number
}

export interface ProductItem {
  id: number
  img_src?: string
  desc?: string
  name: string
  price: number
}
