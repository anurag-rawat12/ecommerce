import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { add, remove } from "../Redux/Slices/CartSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Products = () => {

    const [product, setproduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
                setproduct(data);

            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    /* eslint-disable @typescript-eslint/no-explicit-any */

    const cartItems = useSelector((state: any) => state.cart.items);

    const dispatch = useDispatch()

    const addToCart = (item: any) => {
        dispatch(add(item));
    }
    const removeFromCart = (item: any) => {
        dispatch(remove(item.id));
    }

    if (isLoading) {
        return (
           <Spinner/>
        );
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-[2vw] lg:grid-cols-4 gap-6 px-4 pb-6">
            {product.map((item: any) => (
                <div
                    key={item.id}
                    className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full"
                >
                    <div 
                    onClick={()=>{
                        navigate(`/product/${item.id}`)
                    }}
                    className="relative pt-[100%] cursor-pointer">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="absolute top-0 left-0 w-full h-full object-contain p-4"
                            loading="lazy"
                        />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                        <h2 className="font-medium line-clamp-2 min-h-[3rem] mb-3">
                            {item.title}
                        </h2>
                        <div className="mt-auto flex justify-between items-center">
                            <p className="text-lg font-semibold">${item.price.toFixed(2)}</p>
                            {
                                cartItems && cartItems.find((cartItem: any) => cartItem.id === item.id) ? (
                                    <button
                                        onClick={() => removeFromCart(item)}
                                        className="px-3 py-1.5 cursor-pointer bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors duration-200 whitespace-nowrap">
                                        Remove from Cart
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => addToCart(item)}
                                        className="px-3 py-1.5 cursor-pointer bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors duration-200 whitespace-nowrap">
                                        Add to Cart
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Products