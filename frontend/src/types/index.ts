export interface IProduct {
  id: string;
  title: string;
  slug: string;
  description: string;
  article: string;
  brand: string;
  series: string;
  originCountry: string;
  price: number;
  color: string;
  dishwasherSafe: boolean;
  batteryRequired: boolean;
  sold: number;
  createdAt: string;
  updatedAt: string;

  images: string[]; // URL'lar

  characteristics: {
    [key: string]: unknown;
  };

  dimensions: {
    productWeight: number;
    productHeight: number;
    productWidth: number;
    productLength: number;
    packageHeight: number;
    packageWidth: number;
    packageLength: number;
    productVolume: number;
  };
  category: {
    id: string;
    name: string;
    slug: string;
    subcategories: [
      {
        id: string;
        name: string;
        slug: string;
        categoryId: string;
      }
    ];
  };

  variants: IProductVariant[];
  isNew?: boolean; // optional if used
  quantity?: number;
}

export interface IProductVariant {
  id?: string;
  color: string;
  price: number;
  inStock: boolean;
  images: string[];
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

export enum UserRole {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
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

export type Subcategory = {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  description: string;
  products: IProduct[]; // Agar Product tipi mavjud bo‘lsa
  createdAt: string;
  updatedAt: string;
  category: Category;
  imageUrl: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  subcategories: Subcategory[];
  products: IProduct[]; // Agar Product tipi mavjud bo‘lsa
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
  _count: { products: number; subcategories: number };
};
