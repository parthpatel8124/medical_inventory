import { useState } from "react";
import { useItems } from "../store/itemStore";
import { ArrowUpDown, Search, Filter, Calendar } from "lucide-react";

const InventoryTable = () => {
  const { items, formatDate } = useItems();
  const [searchQuery, setSearchQuery] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const [expiryFilter, setExpiryFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Filtering items
  const filteredItems = items.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (stockFilter === "" || eval(`${item.quantity} ${stockFilter}`)) &&
      (expiryFilter === "" ||
        (item.expiryDate &&
          new Date(item.expiryDate) >= new Date(expiryFilter)))
    );
  });

  // Sorting items by name
  const sortedItems = [...filteredItems].sort((a, b) =>
    sortOrder === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-between">
        {/* Search by Name */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-1">Search items</label>
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Type to search..."
              className="w-64 pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Filter by Stock */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-1">Filter Stock</label>
          <div className="relative">
            <Filter className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
            <select
              className="w-52 pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setStockFilter(e.target.value)}
            >
              <option value="">Select</option>
              <option value="> 10">Greater than 10</option>
              <option value="< 10">Less than 10</option>
              <option value="=== 10">Equal to 10</option>
            </select>
          </div>
        </div>

        {/* Filter by Expiry Date */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-1">Expiry Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
            <input
              type="date"
              className="w-52 pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setExpiryFilter(e.target.value)}
            />
          </div>
        </div>

        {/* Sort Button */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-1 invisible">Sort</label>
          <button
            className="flex items-center gap-2 bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            <ArrowUpDown className="w-5 h-5" />
            Sort
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-500 text-white uppercase text-sm tracking-wider">
              <th className="p-4 border ">Item Name</th>
              <th className="p-4 border">Stock</th>
              <th className="p-4 border">Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {sortedItems.length > 0 ? (
              sortedItems.map((item, index) => (
                <tr
                  key={item._id}
                  className={`border-b text-center ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-200 transition`}
                >
                  <td className="p-4 border font-medium ">{item.name}</td>
                  <td className="p-4 border">{item.quantity}</td>
                  <td className="p-4 border">
                 { new Date(item.expiryDate).toDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-6 text-center text-gray-500">
                  No items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTable;
