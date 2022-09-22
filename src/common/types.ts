export interface ProductItem {
  product: {
    id: number,
    img_src?: string,
    desc?: string,
    name: string,
    price: number
  },
  qty: number
}