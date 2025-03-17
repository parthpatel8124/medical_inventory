import { useItems } from "../store/itemStore"; // ✅ Import useItems
import { format } from "date-fns";

const LowStockList = ({ setView }) => {
  const { items } = useItems(); // ✅ Now useItems will work
  const lowStockItems = items.filter((item) => item.quantity < 10);

  return (
    <div className="p-6">
      <button onClick={() => setView("dashboard")} className="mb-4 px-4 py-2 bg-gray-300 rounded">
        ⬅ Back to Dashboard
      </button>
      <h2 className="text-2xl font-bold mb-4">Low Stock Items</h2>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-left">Name</th>
            <th className="border border-gray-300 p-2 text-left">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {lowStockItems.length > 0 ? (
            lowStockItems.map((item) => (
              <tr key={item._id}> {/* 🔥 Use unique key */}
                <td className="border border-gray-300 p-2">{item.name}</td>
                <td className="border border-gray-300 p-2">{item.quantity}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center text-gray-500 p-2">No low stock items</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LowStockList;
