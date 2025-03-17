// import { Link } from "react-router-dom";
// import { useItems } from "../store/itemStore";

// const ProductsPage = () => {
//   const { items } = useItems();

//   if (!items || items.length === 0) {
//     return <p className="text-center text-gray-500 mt-6">No products available.</p>;
//   }

//   return (
//     <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//       {items.map((product) => (
//         <div
//           key={product._id}
//           className="p-4 border rounded-md shadow-md hover:shadow-lg transition-shadow"
//         >
//           <img
//             src={product.image ? `http://localhost:5000${product.image}` : "/placeholder.jpeg"}
//             alt={product.name}
//             className="w-full h-40 object-cover rounded-md"
//           />
//           <div className="p-4">
//             <h2 className="text-xl font-semibold">{product.name}</h2>
//             <p className="text-gray-600">{product.details}</p>
//             <p className={`font-bold ${product.quantity === 0 ? "text-red-600" : "text-green-600"}`}>
//               {product.quantity === 0 ? "Out of Stock" : `Stock: ${product.quantity}`}
//             </p>
//             <Link
//               to={`/product/${product._id}`}
//               className={`block mt-4 text-center py-2 rounded-md ${
//                 product.quantity === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white"
//               }`}
//             >
//               {product.quantity === 0 ? "Out of Stock" : "View Details"}
//             </Link>
//           </div>

//         </div>

//       ))}
//     </div>
//   );
// };

// export default ProductsPage;

import { Link } from "react-router-dom";
import { useItems } from "../store/itemStore";

const ProductsPage = () => {
  const { items } = useItems();

  if (!items || items.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-6">No products available.</p>
    );
  }

  return (
    <div>

    <h1 className="text-3xl mb-5 mt-5 font-bold">Medicines</h1>
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((product) => (
        <div
          key={product._id}
          className="p-4 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
        >
          {/* Product Image */}
          <div className="relative">
            <img
              src={
                product.image
                  ? `http://localhost:5000${product.image}`
                  : "/placeholder.jpeg"
              }
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            {/* Stock Badge */}
            <span
              className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold uppercase rounded-full ${
                // product.quantity < 10  ? "bg-red-400 text-white cursor-not-allowed": "bg-blue-500  text-white"
                product.quantity < 100
                  ? "bg-red-300 text-white"
                  : product.quantity < 200
                  ? "bg-yellow-300 text-white"
                  : "bg-green-300 text-white"
              }`}
            >
              {product.quantity === 0
                ? "Out of Stock"
                : `Stock: ${product.quantity}`}
            </span>
          </div>

          {/* Product Info */}
          <div className="p-4 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {product.name}
            </h2>
            <p className="text-gray-600 text-sm">{product.details}</p>
            <p className="font-bold text-lg text-blue-600">₹{product.price}</p>

            {/* View Details Button */}
            <Link
              to={`/product/${product._id}`}
              className={`block mt-4 py-2 px-4 text-center rounded-lg transition-all duration-300 ${
                product.quantity === 0
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-400 text-white"
              }`}
            >
              {product.quantity === 0 ? "Out of Stock" : "View Details"}
            </Link>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default ProductsPage;
