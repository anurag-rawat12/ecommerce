import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
    /* eslint-disable @typescript-eslint/no-explicit-any */

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [categories, setCategories] = useState<string[]>([]);
    const navigate = useNavigate();
    const cartItems = useSelector((state: any) => state.cart.items);
    const count = cartItems.length;

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data: { category: string }[] = await response.json();

                const uniqueCategories = [...new Set(data.map((product) => product.category))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);
    const token = localStorage.getItem('token');
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login")
    }


    return (
        <div className=' flex justify-center items-center z-[100] w-full h-[10vh]'>
            <nav className="bg-gray-100 p-4 lg:w-[85%] w-[100%] rounded-4xl flex justify-between lg:justify-center items-center">
                <Link to="/" className="lg:w-[40%] w-fit text-lg cursor-pointer ">Home</Link>
                <ul className="flex select-none justify-between items-center w-[85%] lg:w-[50%]">
                    <li className="relative">
                        <div
                            onClick={toggleDropdown}
                            className="cursor-pointer flex justify-between items-center lg:gap-2 text-gray-700 font-medium hover:text-gray-900 transition-colors"
                        >
                            <span>Category</span>
                            {isDropdownOpen ? (
                                <ChevronUp className="w-4 h-4" />
                            ) : (
                                <ChevronDown className="w-4 h-4" />
                            )}
                        </div>
                        {isDropdownOpen && (
                            <ul className="absolute z-[100] bg-white shadow-lg rounded-md mt-2">
                                {

                                    categories.map((category, index) => (
                                        <li key={index} className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer">
                                            <Link 
                                            onClick={()=>  setIsDropdownOpen(false)}
                                            to={`/products/category/${category}`}>{category}</Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        )}
                    </li>
                    <li>
                        <Link to="/products" className="cursor-pointer flex items-center gap-2 text-gray-700 font-medium hover:text-gray-900 transition-colors">
                            Products
                        </Link>
                    </li>
                    <li className="flex items-center ">
                        <div className='h-5 w-5 rounded-full flex justify-center items-center'>
                            {count}
                        </div>
                        <Link to="/cart" className="cursor-pointer flex items-center gap-2 text-gray-700 font-medium hover:text-gray-900 transition-colors">
                            <ShoppingCart className="w-5 h-5" />
                        </Link>
                    </li>
                    <li className="ml-4">
                        {
                            token ? (
                                <button
                                    onClick={() => handleLogout()}
                                    className="cursor-pointer text-gray-700 font-medium hover:text-gray-900 transition-colors px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                                    Logout
                                </button>
                            ) : (
                                <Link to="/login" className="cursor-pointer text-gray-700 font-medium hover:text-gray-900 transition-colors px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                                    login
                                </Link>
                            )
                        }

                    </li>
                </ul>
            </nav>
        </div >
    );
};

export default Navbar;