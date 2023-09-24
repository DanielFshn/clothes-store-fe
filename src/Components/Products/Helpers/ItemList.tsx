import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../product.model';

interface Item {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  ratingNumber: number;
}

interface ItemListProps {
  items: Product[];
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
            ratingNumber : item.ratingNumber
          }}
        />
      ))}
    </div>
  );
};

export default ItemList;
