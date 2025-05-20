export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  isNew: boolean;
  isFavorite?: boolean;
}
