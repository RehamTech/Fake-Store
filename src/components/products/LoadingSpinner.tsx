import Spinner from 'react-bootstrap/Spinner';

export const LoadingSpinner = () => {
  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white bg-opacity-75" style={{ zIndex: 1050 }}>
      <div className="d-flex flex-column align-items-center gap-3">
        <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="text-secondary fw-medium">Loading products...</p>
      </div>
    </div>
  );
};
