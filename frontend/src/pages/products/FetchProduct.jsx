import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaStar, FaRegStar, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { API_BASE_URL, IMAGE_BASE_URL } from '../../config/api';

const FetchProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/product/getAll`);
        setProducts(response.data.data);
        setFilteredProducts(response.data.data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(response.data.data.map(p => p.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Search and filter logic
  useEffect(() => {
    let result = products;

    // Filter by search query
    if (searchQuery.trim() !== '') {
      result = result.filter(product =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.productDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, products]);


  const renderStars = (rating) => {
    const totalStars = 5;
    return Array.from({ length: totalStars }, (_, index) =>
      index < rating ? (
        <FaStar key={index} className="text-yellow-500" />
      ) : (
        <FaRegStar key={index} className="text-gray-300" />
      )
    );
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold mb-3 text-gray-800">
            Products
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products at competitive prices
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products by name, description, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              All Products ({products.length})
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {category} ({products.filter(p => p.category === category).length})
              </button>
            ))}
          </div>

          {/* Results Count */}
          {searchQuery && (
            <div className="text-center text-gray-600">
              Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} matching "{searchQuery}"
            </div>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-lg mb-2">No products found</p>
            <p className="text-gray-500 text-sm">
              {searchQuery || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'No products available at the moment'}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((pro) => (
            <div
              key={pro._id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col h-full group"
            >
              <div className="relative group">
                <div className="flex justify-center items-center h-56 bg-gray-50 overflow-hidden">
                  <img
                    src={`${IMAGE_BASE_URL}/${pro.productImageUrl}`}
                    alt={pro.productName}
                    className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute top-3 right-3">
                  <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    New
                  </div>
                </div>
              </div>

            <div className="p-5 flex-grow flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-1 hover:text-blue-600 transition-colors truncate">
                  {pro.productName}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-2 h-10">
                  {pro.productDescription}
                </p>
              </div>

              <div className="mt-auto">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    {renderStars(pro.totalRating || 4)}
                  </div>
                  <div>
                    <span className="text-blue-600 font-bold text-lg">
                      Rs {pro.productPrice}
                    </span>
                  </div>
                </div>

                <Link 
                  to={`/singleProduct/${pro._id}`} 
                  className="block w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-center"
                >
                  View Product
                </Link>
              </div>
            </div>
            </div>
          ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FetchProduct;
