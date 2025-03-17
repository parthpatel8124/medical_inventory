import { useState, useEffect } from "react";

const ItemForm = ({ addItem, updateItem, currentItem, setCurrentItem }) => {
  const [item, setItem] = useState({ name: "", quantity: "", expiryDate: "" });

  useEffect(() => {
    if (currentItem) {
      setItem(currentItem);
    }
  }, [currentItem]);

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentItem) {
      updateItem(item);
    } else {
      addItem(item);
    }
    setItem({ name: "", quantity: "", expiryDate: "" });
    setCurrentItem(null);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">{currentItem ? "Edit Item" : "Add Item"}</h2>
      <div className="mb-2">
        <label className="block text-sm font-medium">Item Name</label>
        <input
          type="text"
          name="name"
          value={item.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Quantity</label>
        <input
          type="number"
          name="quantity"
          value={item.quantity}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Expiry Date</label>
        <input
          type="date"
          name="expiryDate"
          value={item.expiryDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {currentItem ? "Update Item" : "Add Item"}
      </button>
    </form>
  );
};

export default ItemForm;
