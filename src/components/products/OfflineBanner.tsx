import Alert from 'react-bootstrap/Alert';
import { AlertCircle } from 'lucide-react';

interface OfflineBannerProps {
  isVisible: boolean;
}

export const OfflineBanner = ({ isVisible }: OfflineBannerProps) => {
  // Using Bootstrap's d-none or similar to toggle visibility might be simpler, 
  // but keeping the transition logic with conditional rendering or CSS classes is fine.
  // We'll use a fixed position div with conditional rendering for simplicity and animation.

  return (
    <div
      className="position-fixed top-0 start-0 w-100 transition-all"
      style={{
        zIndex: 1060,
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease-out',
      }}
    >
      <Alert variant="danger" className="m-0 rounded-0 border-start-0 border-end-0 border-top-0 d-flex align-items-center gap-2">
        <AlertCircle size={20} />
        <span className="fw-semibold">You're currently offline. Some features may be unavailable.</span>
      </Alert>
    </div>
  );
};
