import { CategoryFilter as CategoryFilterType } from '@/types/product';
import Button from 'react-bootstrap/Button';

interface CategoryFilterProps {
  activeCategory: CategoryFilterType;
  onCategoryChange: (category: CategoryFilterType) => void;
}

const categories: { value: CategoryFilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'jewelery', label: 'Jewelry' },
  { value: "men's clothing", label: "Men's Clothing" },
  { value: "women's clothing", label: "Women's Clothing" },
];

export const CategoryFilter = ({ activeCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="d-flex flex-wrap gap-2 mb-4">
      {categories.map((category) => (
        <Button
          key={category.value}
          variant={activeCategory === category.value ? 'primary' : 'outline-secondary'}
          onClick={() => onCategoryChange(category.value)}
          className="rounded-pill px-4 fw-medium"
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
};
