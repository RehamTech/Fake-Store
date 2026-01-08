import { useState, useEffect } from 'react';
import { Product, CategoryFilter as CategoryFilterType } from '@/types/product';
import { fetchProducts } from '@/services/api';
import { CategoryFilter } from './CategoryFilter';
import { ProductGrid } from './ProductGrid';
import { LoadingSpinner } from './LoadingSpinner';
import { OfflineBanner } from './OfflineBanner';
import { useOnlineStatus } from '@/hooks/use-online-status';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

export const ProductListing = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<CategoryFilterType>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isOnline = useOnlineStatus();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();

        // Minimum display time of 500ms for loading state
        await new Promise(resolve => setTimeout(resolve, 500));

        setProducts(data);
        setFilteredProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to load products. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === activeCategory));
    }
  }, [activeCategory, products]);

  const handleCategoryChange = (category: CategoryFilterType) => {
    setActiveCategory(category);
  };

  if (error) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
          <p className="lead text-danger mb-4">{error}</p>
          <Button
            variant="primary"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light position-relative">
      <OfflineBanner isVisible={!isOnline} />

      {loading && <LoadingSpinner />}

      <Container className="py-5" style={{ maxWidth: '1200px' }}>
        <h1 className="display-4 fw-bold mb-5 ps-2">
          Products
        </h1>

        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        <ProductGrid products={filteredProducts} />
      </Container>
    </div>
  );
};
