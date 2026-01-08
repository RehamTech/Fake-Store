import { Product } from '@/types/product';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card
      className="h-100 cursor-pointer border-0 shadow-sm hover-shadow transition-all"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="text-center p-4 bg-light rounded-top">
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.title}
          style={{ height: '200px', objectFit: 'contain' }}
        />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-6 mb-2 text-truncate-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          {product.title}
        </Card.Title>
        <div className="mt-auto">
          <h4 className="fw-bold text-primary mb-3">${product.price.toFixed(2)}</h4>
          <Button
            variant="primary"
            className="w-100 fw-semibold"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            View Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};
