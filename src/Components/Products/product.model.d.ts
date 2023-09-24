export interface productCreationDTO {
  name: string;
  description: string;
  price: decimal;
  quantity: int;
  imageUrl: string;
  categoryId: string;
  sizeId: string;
  genderId: string;
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