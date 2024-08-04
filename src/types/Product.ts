export type Product = {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: Category;
  thumbnail: string;
};
export type ProductInputs = Omit<Product, "id">;
export type Category = {
  _id: string;
  name: string;
  description: string;
};
export type CartItem = {
  product: Product;
  quantity: number;
};
export type Cart = {
  _id: string;
  user: string;
  products: CartItem[];
};

export type Search = {
  pro_name: string;
};
