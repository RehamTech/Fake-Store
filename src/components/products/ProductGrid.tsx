import { Product } from '@/types/product';
import { ProductCard } from './ProductCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid = ({ products }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="lead text-muted">No products found in this category.</p>
      </div>
    );
  }

  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
      {products.map((product) => (
        <Col key={product.id}>
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );
};
