import Spinner from "../components/Spinner";
import { add, remove } from "../Redux/Slices/CartSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Product = () => {

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { id } = useParams();
  const [product, setProduct] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.items);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [id]);

  const addToCart = (item: any) => {
    dispatch(add(item));
  };

  const removeFromCart = (item: any) => {
    dispatch(remove(item.id));
  };

  if (isLoading) {
    return (
      <Spinner />
    );
  }

  if (!product.id) return <div className="flex justify-center items-center h-screen">Product not found</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8 bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Product Image - Full width on mobile, half on desktop */}
        <div className="lg:w-1/2 bg-gray-50 flex items-center justify-center p-4 sm:p-8">
          <img
            src={product.image}
            alt={product.title}
            className="object-contain h-64 sm:h-80 md:h-96 w-full"
            loading="lazy"
          />
        </div>

        {/* Product Details - Full width on mobile, half on desktop */}
        <div className="lg:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            {product.title}
          </h1>

          <div className="flex items-center mb-4 sm:mb-6">
            <span className="text-xl sm:text-2xl font-semibold text-gray-800">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <div className="mb-6 sm:mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
              Description
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              {product.description}
            </p>
          </div>


          <div className="mt-auto">
            {cartItems && cartItems.find((cartItem: any) => cartItem.id === product.id) ? (
              <button
                onClick={() => removeFromCart(product)}
                className="w-full bg-red-600 text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-red-700 transition duration-200 text-sm sm:text-base"
              >
                Remove from Cart
              </button>
            ) : (
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-blue-600 text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 text-sm sm:text-base"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;