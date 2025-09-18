import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listProductByCategory } from "../../store/productSlice"; 
import Navbar from "../../globals/components/navbar/Navbar";

const ProductByCategory = () => {
  const { categoryName } = useParams();
  const dispatch = useDispatch();

  // Select products by category and status from the redux store
  const products = useSelector((state) => state.product.productByCategory);
  const status = useSelector((state) => state.product.status);

  useEffect(() => {
    if (categoryName) {
      dispatch(listProductByCategory(categoryName));
    }
  }, [dispatch, categoryName]);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 mt-16">
        <h1 className="text-3xl font-bold mb-8">Products in {categoryName}</h1>

        {(!products || products.length === 0) ? (
          <p>No products found in this category.</p>
        ) : (
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {products.map((product) => (
              <div key={product._id || product.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                <img
                  src={`http://localhost:3000/${product.productImageUrl}`}
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
