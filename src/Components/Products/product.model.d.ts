export interface productCreationDTO {
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
  category: CategoryOption; // CategoryOption represents the selected category
  gender: GenderOption; // GenderOption represents the selected gende
  size: SizeOption; // SizeOption represents the selected size
}


export interface SizeOption {
  id: string;
  name: string;
}

export interface CategoryOption {
  id: string;
  name: string;
}

export interface GenderOption {
  id: string;
  name: string;
}


export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  ratingNumber : number;
}

export interface ProductDetailsDTO {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryName: string;
  genderName: string;
  sizeName: string;
  ratingNumber: number;
}


export interface ProductRatingCreation {
  productId: string;
  userId: string;
  ratingNumber: number;
  title: string;
  comments: string;
}