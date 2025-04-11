import { useState, useEffect, useRef } from "react";
import useCart from "../store/cartStore";
import { FileText } from "lucide-react";
import { generatePDF } from '../utils/generatePDF';
import BillTemplate from '../components/BillTemplate';
import { useSettings } from "../store/SettingsStore";
import { toast } from "react-toastify"; // Add this import
import "react-toastify/dist/ReactToastify.css"; // Add this import
import { createRoot } from 'react-dom/client'; // Update import

const CartPage = () => {
  const { cart, fetchCart, removeFromCart, checkout } = useCart();
  const { settings } = useSettings(); // Add this
  const [buyerInfo, setBuyerInfo] = useState({
    buyerName: "",
    buyerPhone: "",
    paymentMode: "cash"
  });
  const billTemplateRef = useRef();
  const [purchaseData, setPurchaseData] = useState(null); // Add this

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    // Update purchaseData whenever cart or buyerInfo changes
    setPurchaseData({
      ...buyerInfo,
      items: cart.items,
      totalAmount: cart.totalAmount,
      purchaseDate: new Date(),
      _id: Date.now().toString() // Temporary ID for new purchases
    });
  }, [cart, buyerInfo]);

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      if (!buyerInfo.buyerName || !buyerInfo.buyerPhone) {
        toast.error("Please fill in all customer details");
        return;
      }

      // Create purchase data with individual items
      const purchaseForBill = {
        ...buyerInfo,
        purchaseDate: new Date(),
        _id: Date.now().toString(),
        // Keep items array intact for multiple items
        items: cart.items.map(item => ({
          ...item,
          amount: item.price * item.quantity // Add amount for each item
        })),
        totalAmount: cart.totalAmount
      };

      try {
        await generateBill(purchaseForBill);
        await checkout(buyerInfo);
        toast.success("Purchase completed and bill generated successfully!");
      } catch (error) {
        console.error("Error during checkout/bill generation:", error);
        toast.error("Failed to complete purchase");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to complete purchase");
    }
  };

  const generateBill = async (purchaseData) => {
    try {
      // Create a temporary container
      const billElement = document.createElement('div');
      billElement.style.position = 'absolute';
      billElement.style.left = '-9999px';
      document.body.appendChild(billElement);

      // Create root and render
      const root = createRoot(billElement);
      root.render(
        <BillTemplate
          ref={billTemplateRef}
          purchaseData={purchaseData}
          settings={settings}
        />
      );

      // Wait for render
      await new Promise(resolve => setTimeout(resolve, 100));

      // Generate PDF
      await generatePDF(
        billTemplateRef.current,
        `invoice-${purchaseData.buyerName}-${Date.now()}.pdf`
      );

      // Cleanup
      root.unmount();
      document.body.removeChild(billElement);
    } catch (error) {
      console.error("Bill generation failed:", error);
      throw error;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Shopping Cart</h1>
      
      {cart.items.length > 0 ? (
        <>
          {cart.items.map((item) => (
            <div key={item.itemId} className="flex justify-between items-center border-b py-2">
              <div className="flex items-center gap-4">
                <img 
                  src={item.image ? `http://localhost:5000${item.image}` : "/placeholder.jpeg"} 
                  alt={item.name} 
                  className="w-16 h-16 object-cover rounded" 
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p>₹{item.price * item.quantity}</p>
                <button
                  onClick={() => removeFromCart(item.itemId)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-6 p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Checkout</h2>
            <form onSubmit={handleCheckout} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={buyerInfo.buyerName}
                onChange={(e) => setBuyerInfo({...buyerInfo, buyerName: e.target.value})}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={buyerInfo.buyerPhone}
                onChange={(e) => setBuyerInfo({...buyerInfo, buyerPhone: e.target.value})}
                className="w-full p-2 border rounded"
                required
              />
              <select
                value={buyerInfo.paymentMode}
                onChange={(e) => setBuyerInfo({...buyerInfo, paymentMode: e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="upi">UPI</option>
              </select>
              
              <div className="flex justify-between items-center">
                <p className="text-xl font-bold">Total: ₹{cart.totalAmount}</p>
                <div className="space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                  >
                    Complete Purchase
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
      <div style={{ display: 'none' }}>
        {purchaseData && (
          <BillTemplate 
            ref={billTemplateRef} 
            purchaseData={purchaseData} 
            settings={settings} 
          />
        )}
      </div>
    </div>
  );
};

export default CartPage;
