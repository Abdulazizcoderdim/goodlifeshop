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

export interface IUser {
  id: string;
  email: string;
  password: string;
  firstName?: string | null;
  lastName?: string | null;
  phoneNumber?: string | null;
  surname?: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  refreshToken: IRefreshToken[];
}

enum UserRole {
  ADMIN,
  CUSTOMER,
  MANAGER,
}

export interface IRefreshToken {
  id: string;
  token: string;
  userId: string;
  createdAt: Date;
  expiresAt: Date;
}

export interface StoreState {
  favorites: IProduct[];
  cart: IProduct[];
  toggleFavorite: (product: IProduct) => void;
  addToCart: (product: IProduct) => void;
  isFavorite: (productId: number) => boolean;
  isInCart: (productId: number) => boolean;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  updateQuantity: (productId: number, quantity: number) => void;
}
