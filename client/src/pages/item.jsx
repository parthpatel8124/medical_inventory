import { useState, useEffect } from "react";
import { Pencil, Trash2, PlusCircle } from "lucide-react";

const ItemsPage = () => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({ name: "", quantity: "", expiryDate: "" });
  const [editingItemId, setEditingItemId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/items");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        editingItemId ? `http://localhost:5000/api/items/${editingItemId}` : "http://localhost:5000/api/items",
        {
          method: editingItemId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        }
      );
      if (response.ok) {
        fetchItems();
        alert(editingItemId ? "Item updated successfully!" : "Item added successfully!");
      }
    } catch (error) {
      console.error(editingItemId ? "Error updating item:" : "Error adding item:", error);
    }
    setItem({ name: "", quantity: "", expiryDate: "" });
    setEditingItemId(null);
  };

  const handleEdit = (item) => {
    setItem(item);
    setEditingItemId(item._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      const response = await fetch(`http://localhost:5000/api/items/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchItems();
        alert("Item deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Items</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-blue-700 transition">
          <PlusCircle size={20} /> Add New Item
        </button>
      </div>

      {/* Form Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">{editingItemId ? "Edit Item" : "Add Item"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Item Name</label>
            <input
              type="text"
              name="name"
              value={item.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={item.quantity}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
              <input
                type="date"
                name="expiryDate"
                value={item.expiryDate}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg shadow-md hover:bg-green-600 transition"
          >
            {editingItemId ? "Update Item" : "Add Item"}
          </button>
        </form>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-left">Item Name</th>
              <th className="py-3 px-4 text-left">Quantity</th>
              <th className="py-3 px-4 text-left">Expiry Date</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((curItem) => (
                <tr key={curItem._id} className="border-t hover:bg-gray-100 transition">
                  <td className="py-3 px-4">{curItem.name}</td>
                  <td className="py-3 px-4">{curItem.quantity}</td>
                  <td className="py-3 px-4">
                    {curItem.expiryDate ? new Date(curItem.expiryDate).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="py-3 px-4 flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(curItem)}
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <Pencil size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(curItem._id)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemsPage;
