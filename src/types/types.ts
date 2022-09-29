export interface User {
  email: string;
  password: string;
  givenName: string;
  familyName: string;
  code: string; // <--- this is the verification code that will be send to user email to verify email
  showPassword: boolean;
}

export interface ProductItemWithQty {
  product: {
    id: number;
    img_src?: string;
    desc?: string;
    name: string;
    price: number;
  };
  qty: number;
}

export interface ProductItem {
  id: number;
  img_src?: string;
  desc?: string;
  name: string;
  price: number;
}
