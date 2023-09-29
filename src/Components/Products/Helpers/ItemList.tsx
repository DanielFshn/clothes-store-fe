import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../product.model';

interface Item {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  categoryName: string;
  genderName: string;
  sizeName: string;
  ratingNumber: number;
}

interface ItemListProps {
  items: Product[];
  updateDataTimestamp : () =>  void;
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {items.map((item) => (
        <ProductCard
        key={item.id}
        product={{
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            imageUrl: item.imageUrl,
            categoryName : item.categoryName,
            genderName : item.genderName,
            sizeName: item.sizeName,
            ratingNumber : item.ratingNumber
          }}
          updateDataTimestamp={() =>{Date.now()}}
        />
      ))}
    </div>
  );
};

export default ItemList;
