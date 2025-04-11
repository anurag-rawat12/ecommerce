import { RootState } from '@/Redux/Store';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, remove } from '../Redux/Slices/CartSlice';
import { ToastContainer, toast } from 'react-toastify';
import { Trash } from 'lucide-react';

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  console.log(cartItems);
  const dispatch = useDispatch();

  const CartHandle = () => {
    toast("Order Place Successfully", {
      autoClose: 4000,
      onClose: () => dispatch(clearCart())
    }
    );
  };

  const removeItem = (id: number) => {
    dispatch(remove(id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl  text-gray-900 mb-8">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium text-gray-500">Your cart is empty</h2>
          <p className="mt-2 text-gray-400">Start adding some items to your cart</p>
        </div>
      ) : (
        <div className="grid gap-8">

          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row border-b border-gray-200 last:border-b-0 p-4 hover:bg-gray-50 transition-colors duration-150"
              >
                <div className="flex-shrink-0 w-full sm:w-32 h-32 mb-4 sm:mb-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>

                <div className="flex-grow sm:px-4">
                  <div className="flex justify-between">
                    <h2 className="text-lg font-medium text-gray-900 line-clamp-2">
                      {item.title}
                    </h2>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-lg text-gray-900 mt-2">${item.price.toFixed(2)}</p>

                </div>
              </div>
            ))}
          </div>

          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>

            <div className="flex justify-between border-t border-gray-200 pt-3 mt-3">
              <span className="text-lg font-medium">Total</span>
              <span className="text-lg ">
                ${cartItems.reduce((sum, item) => sum + (item.price), 0).toFixed(2)}
              </span>
            </div>
            <button
              onClick={() =>
                CartHandle()
              }
              className="w-fit mt-6 mx-auto bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium transition-colors duration-200"
            >
              <ToastContainer />
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;