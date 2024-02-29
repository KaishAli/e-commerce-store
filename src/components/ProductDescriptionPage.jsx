import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

function ProductDescriptionPage() {
  const { productId } = useParams();

  const location = useLocation();
  console.log(location.state,'location');
  // Fetch product details using productId and display them

  return (
    <div>
      <h2>Product Description</h2>
      {/* Product details */}
    </div>
  );
}

export default ProductDescriptionPage;