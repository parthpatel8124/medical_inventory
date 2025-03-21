import { Link} from "react-router-dom";
import { useItems } from "../store/itemStore";
import { Plus, Minus, ShoppingBag, ArrowRight, Search, ChevronDown } from "lucide-react";
import { useState } from "react";

const ProductsPage = () => {
  const { items } = useItems();
  const [quantities, setQuantities] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // Default: A-Z sorting

  const handleIncrease = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const handleDecrease = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleSortChange = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // Filtering and Sorting by Name (A-Z or Z-A)
  const filteredItems = items
    .filter((product) => product.name.toLowerCase().includes(searchTerm))
    .sort((a, b) => (sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));

  return (
    <div>
      <h1 className="text-3xl mt-6 mb-5 font-bold">Medicines</h1>
      {/* Search and Sort Box */}
      <div className="flex items-center justify-between p-4 bg-white shadow-lg rounded-lg mb-5">
        <div className="flex items-center space-x-3">
          {/* Search Input */}
          <div className="flex items-center bg-gray-200 px-3 py-2 rounded-lg">
            <Search className="text-gray-600" size={18} />
            <input
              type="text"
              placeholder="Search Medicines"
              className="bg-transparent outline-none px-2 text-gray-800"
              onChange={handleSearch}
            />
          </div>

          {/* Sort Button (A-Z, Z-A) */}
          <button
            onClick={handleSortChange}
            className="flex items-center bg-gray-200 px-3 py-1 rounded-lg cursor-pointer"
          >
            {sortOrder === "asc" ? "Sort: A-Z" : "Sort: Z-A"}
            <ChevronDown className="ml-2" size={16} />
          </button>
        </div>

        {/* Cart Icon */}
        <Link to="/cart">
        <button className="p-2 text-blue-500 hover:text-blue-700 cursor-pointer">
          <ShoppingBag size={25} />
        </button>
        </Link>
      </div>

      {/* Products Section */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((product) => (
            <div
              key={product._id}
              className="p-4 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 relative"
            >
              {/* Product Image */}
              <div className="relative">
                <img
                  src={product.image ? `http://localhost:5000${product.image}` : "/placeholder.jpeg"}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                {/* Stock Badge */}
                <span
                  className={`absolute top-2 left-2 px-2 py-1 text-xs font-bold uppercase rounded-full ${
                    product.quantity < 100
                      ? "bg-red-300 text-white"
                      : product.quantity < 200
                      ? "bg-yellow-300 text-white"
                      : "bg-green-300 text-white"
                  }`}
                >
                  {product.quantity === 0 ? "Out of Stock" : `Stock: ${product.quantity}`}
                </span>
                {/* View Details Arrow */}
                <Link
                  to={`/product/${product._id}`}
                  className="absolute top-2 right-2 p-1 rounded-full bg-white shadow hover:bg-gray-100 transition"
                >
                  <ArrowRight className="text-blue-500" size={20} />
                </Link>
              </div>

              {/* Product Info */}
              <div className="p-4 text-center">
                <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
                <p className="font-bold text-lg text-blue-600">₹{product.price}</p>
              </div>

              {/* Quantity Selector & Add to Cart */}
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDecrease(product._id)}
                    className="px-2 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-lg font-semibold">{quantities[product._id] || 1}</span>
                  <button
                    onClick={() => handleIncrease(product._id)}
                    className="px-2 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition-all">
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-6">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;


// import { Link } from "react-router-dom";
// import { useItems } from "../store/itemStore";
// import  useCart  from "../store/cartStore"; 
// import { Plus, Minus, ShoppingBag, ArrowRight, Search, ChevronDown } from "lucide-react";
// import { useState } from "react";

// const ProductsPage = () => {

//   const { items } = useItems();
//   const { addToCart,cart } = useCart();
//   const [quantities, setQuantities] = useState({});
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortOrder, setSortOrder] = useState("asc");

//   const handleIncrease = (id) => {
//     setQuantities((prev) => ({
//       ...prev,
//       [id]: (prev[id] || 1) + 1,
//     }));
//   };

//   const handleDecrease = (id) => {
//     setQuantities((prev) => ({
//       ...prev,
//       [id]: prev[id] > 1 ? prev[id] - 1 : 1,
//     }));
//   };

//   const handleAddToCart = (product) => {
//     addToCart(product, quantities[product._id] || 1);
//   };

//   return (
//     <div>
//       <h1 className="text-3xl mt-6 mb-5 font-bold">Medicines</h1>

//       {/* Search and Sort Box */}
//       <div className="flex items-center justify-between p-4 bg-white shadow-lg rounded-lg mb-5">
//         <div className="flex items-center space-x-3">
//           <div className="flex items-center bg-gray-200 px-3 py-2 rounded-lg">
//             <Search className="text-gray-600" size={18} />
//             <input
//               type="text"
//               placeholder="Search Medicines"
//               className="bg-transparent outline-none px-2 text-gray-800"
//               onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
//             />
//           </div>

//           <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
//             className="flex items-center bg-gray-200 px-3 py-1 rounded-lg cursor-pointer">
//             {sortOrder === "asc" ? "Sort: A-Z" : "Sort: Z-A"}
//             <ChevronDown className="ml-2" size={16} />
//           </button>
//         </div>

//         {/* Cart Icon */}
//         {/* Cart Icon with Badge */}
//       <Link to="/cart" className="relative">
//         <button className="p-2 text-blue-500 hover:text-blue-700 cursor-pointer">
//           <ShoppingBag size={25} />
//         </button>
//         {cart.length > 0 && (
//           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
//             {cart.length}
//           </span>
//         )}
//       </Link>
//       </div>

//       {/* Products Section */}
//       <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {items
//           .filter((p) => p.name.toLowerCase().includes(searchTerm))
//           .sort((a, b) => (sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)))
//           .map((product) => (
//             <div key={product._id} className="p-4 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all">
//               <img src={product.image ? `http://localhost:5000${product.image}` : "/placeholder.jpeg"}
//                 alt={product.name} className="w-full h-48 object-cover rounded-lg" />

//               <h2 className="text-xl font-semibold text-gray-900 text-center">{product.name}</h2>
//               <p className="font-bold text-lg text-blue-600 text-center">₹{product.price}</p>

//               <div className="flex items-center justify-between p-2">
//                 <div className="flex items-center space-x-2">
//                   <button onClick={() => handleDecrease(product._id)}
//                     className="px-2 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
//                     <Minus size={16} />
//                   </button>
//                   <span className="text-lg font-semibold">{quantities[product._id] || 1}</span>
//                   <button onClick={() => handleIncrease(product._id)}
//                     className="px-2 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
//                     <Plus size={16} />
//                   </button>
//                 </div>

//                 <button onClick={() => handleAddToCart(product)}
//                   className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600">
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default ProductsPage;
