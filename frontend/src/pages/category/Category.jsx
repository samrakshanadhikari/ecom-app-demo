import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAllCategory } from "../../store/categorySlice";
import { Link } from "react-router-dom";

const Category = () => {
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(listAllCategory());
  }, [dispatch]);

  return (
    <div className=" py-12 px-6">
      <h1 className="text-4xl font-extrabold mb-12 text-gray-900 tracking-wide ml-96">
        Explore Categories
      </h1>

      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 max-w-7xl mx-auto">
        {category?.map((cat) => (
          <Link to={`/productByCategory/${cat?.categoryName}`}
            key={cat._id || cat.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transform transition duration-300 cursor-pointer border border-gray-200 flex flex-col"
          >
            <div className="flex justify-center items-center h-40 bg-gray-100 rounded-t-2xl overflow-hidden">
              <img
                src={`http://localhost:3000/${cat.categoryImageUrl}`}
                alt={cat.categoryName}
                className="max-h-full object-contain"
              />
            </div>

            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-lg font-semibold text-gray-800 truncate mb-2">
                {cat.categoryName}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
