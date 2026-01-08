import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ProductListing } from "./components/products/ProductListing";
import { ProductDetail } from "./components/products/ProductDetail";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </>
    </Suspense>
  );
}

export default App;
