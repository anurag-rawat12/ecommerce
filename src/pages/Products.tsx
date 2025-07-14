import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { add, remove } from "../Redux/Slices/CartSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Products = () => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [products, setProducts] = useState([]);
  const [allData, setAllData] = useState([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [page, setPage] = useState(1);

  const observerRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.items);

  const pageSize = 32;

  const fetchAllProducts = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setAllData(data);

      // Load first page
      setProducts(data.slice(0, pageSize));
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setIsInitialLoading(false);
    }
  };

  const loadMore = () => {
    if (isFetchingMore || allData.length === 0) return;

    setIsFetchingMore(true);

    setTimeout(() => {
      const startIndex = (page * pageSize) % allData.length;
      const endIndex = startIndex + pageSize;

      let nextBatch;
      if (endIndex <= allData.length) {
        nextBatch = allData.slice(startIndex, endIndex);
      } else {
        // If we reach the end, wrap around
        nextBatch = [
          ...allData.slice(startIndex),
          ...allData.slice(0, endIndex % allData.length),
        ];
      }

      setProducts(prev => [...prev, ...nextBatch]);
      setPage(prev => prev + 1);
      setIsFetchingMore(false);
    }, 500);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (isInitialLoading) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    const target = observerRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [products, isInitialLoading]);

  const addToCart = (item: any) => dispatch(add(item));
  const removeFromCart = (item: any) => dispatch(remove(item.id));

  if (isInitialLoading) return <Spinner />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-[2vw] lg:grid-cols-4 gap-6 px-4 pb-6">
      {products.map((item: any, index: number) => (
        <div
          key={`${item.id}-${index}`}
          className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full"
        >
          <div
            onClick={() => navigate(`/product/${item.id}`)}
            className="relative pt-[100%] cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.title}
              className="absolute top-0 left-0 w-full h-full object-contain p-4"
              loading="lazy"
            />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h2 className="font-medium line-clamp-2 min-h-[3rem] mb-3">{item.title}</h2>
            <div className="mt-auto flex justify-between items-center">
              <p className="text-lg font-semibold">${item.price.toFixed(2)}</p>
              {cartItems.find((cartItem: any) => cartItem.id === item.id) ? (
                <button
                  onClick={() => removeFromCart(item)}
                  className="px-3 py-1.5 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors duration-200"
                >
                  Remove
                </button>
              ) : (
                <button
                  onClick={() => addToCart(item)}
                  className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors duration-200"
                >
                  Add
                </button>
              )}
            </div>
          </div>
        </div>
      ))}

      <div
        ref={observerRef}
        style={{
          height: "60px",
          gridColumn: "span 4",
          textAlign: "center",
          padding: "10px",
        }}
      >
        {isFetchingMore ? "Loading more..." : "Scroll to load more"}
      </div>
    </div>
  );
};

export default Products;
