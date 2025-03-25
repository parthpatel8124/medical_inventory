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
