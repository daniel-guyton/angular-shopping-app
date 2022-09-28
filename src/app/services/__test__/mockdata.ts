import { ProductItem, ProductItemWithQty } from 'src/types/types';

export const dummyUserCart: ProductItemWithQty[] = [
  {
    product: {
      id: 1,
      name: 'blue shirt',
      price: 50
    },
    qty: 1
  }
];

export const dummyProduct: ProductItem = {
  id: 1,
  name: 'blue shirt',
  price: 50
};

export const dummyProducts: ProductItem[] = [
  { id: 1, name: 'blue shirt', price: 50 },
  { id: 2, name: 'grey shirt', price: 30 }
];

export const dummyProductWithQuantity: ProductItemWithQty = {
  product: {
    id: 2,
    name: 'blue shirt',
    price: 20
  },
  qty: 0
};
