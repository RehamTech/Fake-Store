import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import { Product } from '@/types/product';
import { fetchProductById } from '@/services/api';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LoadingSpinner } from './LoadingSpinner';
import { OfflineBanner } from './OfflineBanner';
import { useOnlineStatus } from '@/hooks/use-online-status';
import Swal from 'sweetalert2';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isOnline = useOnlineStatus();

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await fetchProductById(id);

        // Minimum display time of 500ms
        await new Promise(resolve => setTimeout(resolve, 500));

        setProduct(data);
        setError(null);
      } catch (err) {
        setError('Failed to load product. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    Swal.fire({
      icon: 'success',
      title: 'Added to Cart!',
      text: `${product?.title} has been added to your cart.`,
      confirmButtonText: 'Continue Shopping',
      confirmButtonColor: '#0D6EFD',
      timer: 3000,
      timerProgressBar: true,
    });
  };

  const handleBackClick = () => {
    navigate('/');
  };

  if (error) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
          <p className="lead text-danger mb-4">{error}</p>
          <Button onClick={handleBackClick} variant="outline-secondary">
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  if (loading || !product) {
    return (
      <>
        <OfflineBanner isVisible={!isOnline} />
        <LoadingSpinner />
      </>
    );
  }

  return (
    <div className="min-vh-100 bg-light position-relative">
      <OfflineBanner isVisible={!isOnline} />

      <Container className="py-5" style={{ maxWidth: '1200px' }}>
        <Button
          variant="link"
          onClick={handleBackClick}
          className="text-decoration-none d-flex align-items-center gap-2 mb-4 p-0 fw-medium"
        >
          <ArrowLeft size={20} />
          Back to Products
        </Button>

        <Row className="g-5">
          {/* Product Image */}
          <Col lg={6}>
            <div className="bg-white rounded-4 p-5 d-flex align-items-center justify-content-center h-100 shadow-sm">
              <img
                src={product.image}
                alt={product.title}
                className="img-fluid"
                style={{ maxHeight: '500px', objectFit: 'contain' }}
              />
            </div>
          </Col>

          {/* Product Info */}
          <Col lg={6} className="d-flex flex-column">
            <div>
              <Badge
                bg="light"
                text="dark"
                className="mb-3 px-3 py-2 fw-medium border"
              >
                {product.category}
              </Badge>

              <h1 className="fw-bold mb-3 display-5">
                {product.title}
              </h1>

              <div className="d-flex align-items-center gap-2 mb-4">
                <div className="d-flex align-items-center text-warning">
                  <Star fill="currentColor" size={20} />
                  <span className="ms-1 fw-bold text-dark">
                    {product.rating.rate}
                  </span>
                </div>
                <span className="text-muted">
                  ({product.rating.count} reviews)
                </span>
              </div>

              <div className="display-4 fw-bold text-primary mb-4 font-manrope">
                ${product.price.toFixed(2)}
              </div>

              <div className="mb-5">
                <h2 className="h4 fw-bold mb-3">
                  Description
                </h2>
                <p className="lead fs-6 text-secondary" style={{ lineHeight: '1.8' }}>
                  {product.description}
                </p>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-100 py-3 fw-bold mt-auto"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
