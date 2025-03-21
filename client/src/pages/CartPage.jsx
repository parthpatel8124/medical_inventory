// import  useCart  from "../store/cartStore";
// import { Minus, Plus, Trash2 } from "lucide-react";

// const CartPage = () => {
//   const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

//   const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-5">Your Cart</h1>

//       {cartItems.length > 0 ? (
//         <>
//           <div className="grid gap-4">
//             {cartItems.map((item) => (
//               <div key={item._id} className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
//                 <div>
//                   <h2 className="text-xl font-semibold">{item.name}</h2>
//                   <p className="text-blue-600 font-bold">₹{item.price}</p>
//                 </div>

//                 <div className="flex items-center space-x-2">
//                   <button onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
//                     className="p-2 bg-gray-300 rounded-md"><Minus size={16} /></button>
//                   <span className="text-lg font-semibold">{item.quantity}</span>
//                   <button onClick={() => updateQuantity(item._id, item.quantity + 1)}
//                     className="p-2 bg-gray-300 rounded-md"><Plus size={16} /></button>
//                 </div>

//                 <button onClick={() => removeFromCart(item._id)}
//                   className="text-red-500 hover:text-red-700"><Trash2 size={20} /></button>
//               </div>
//             ))}
//           </div>

//           <h2 className="text-2xl font-bold mt-5">Total: ₹{totalAmount}</h2>

//           <button onClick={clearCart} className="mt-4 px-6 py-3 bg-red-500 text-white rounded-lg">
//             Clear Cart
//           </button>
//         </>
//       ) : (
//         <p>Your cart is empty.</p>
//       )}
//     </div>
//   );
// };

// export default CartPage;
import  useCart  from "../store/cartStore";

const CartPage = () => {
  const { cart } = useCart(); // Get cart from Zustand store

  // Ensure cart is defined before calling reduce
  const totalAmount = cart?.length > 0 ? cart.reduce((acc, item) => acc + item.price * item.quantity, 0) : 0;

  return (
    <div>
      <h1 className="text-2xl font-bold">Shopping Cart</h1>
      {cart?.length > 0 ? (
        cart.map((item) => (
          <div key={item._id} className="flex justify-between items-center border-b py-2">
            <p>{item.name}</p>
            <p>₹{item.price} x {item.quantity}</p>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
      <h2 className="text-xl font-bold mt-4">Total: ₹{totalAmount}</h2>
    </div>
  );
};

export default CartPage;
