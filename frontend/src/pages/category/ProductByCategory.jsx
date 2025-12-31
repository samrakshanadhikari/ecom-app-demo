import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listProductByCategory } from "../../store/productSlice"; 
import { STATUS } from "../../globals/status/Status";
import Navbar from "../../globals/components/navbar/Navbar";
import { IMAGE_BASE_URL } from "../../config/api";

const ProductByCategory = () => {
  const { categoryName } = useParams();
  const dispatch = useDispatch();

  // Select products by category and status from the redux store
  const products = useSelector((state) => state.product.productByCategory);
  const status = useSelector((state) => state.product.status);

  useEffect(() => {
    if (categoryName) {
      // Decode the category name from URL
      const decodedCategoryName = decodeURIComponent(categoryName);
      console.log("🔍 Loading products for category:", decodedCategoryName);
      dispatch(listProductByCategory(decodedCategoryName));
    }
  }, [dispatch, categoryName]);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 mt-16">
        <h1 className="text-3xl font-bold mb-8">Products in {categoryName}</h1>

        {status === STATUS.LOADING ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : (!products || products.length === 0) ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">No products found in this category.</p>
            <p className="text-gray-500 text-sm">Try selecting a different category or add products to this category.</p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {products.map((product) => (
              <div key={product._id || product.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                <img
                  src={`${IMAGE_BASE_URL}/${product.productImageUrl}`}
                  alt={product.productName}
                  className="w-full h-40 object-contain mb-4"
                />
                <h2 className="font-semibold text-lg truncate">{product.productName}</h2>
                <p className="text-sm text-gray-600 mb-2">{product.productDescription}</p>
                <p className="font-bold">${product.productPrice}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      
    </>
  );
};

export default ProductByCategory;
