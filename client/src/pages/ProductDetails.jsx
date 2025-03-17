// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`http://localhost:5000/api/items/${id}`)
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch product");
//         return res.json();
//       })
//       .then((data) => {
//         setProduct(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching product:", error);
//         setLoading(false);
//       });
//   }, [id]);

//   const handlePurchase = () => {
//     if (quantity > product.quantity) {
//       alert("Not enough stock available.");
//       return;
//     }

//     fetch(`http://localhost:5000/api/items/${id}/buy`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ quantity }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         alert(data.message);
//         navigate("/products");
//       })
//       .catch((error) => console.error("Error processing purchase:", error));
//   };

//   if (loading) return <p>Loading...</p>;
//   if (!product) return <p>Product not found.</p>;

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <img
//         src={`http://localhost:5000${product.image}`}
//         alt={product.name}
//         className="w-full h-60 object-cover rounded-md"
//       />
//       <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
//       <p className="text-gray-600">{product.details}</p>
//       <p className="text-gray-800">{product.moreDetails}</p>
//       <p className="font-bold text-green-600">Stock: {product.quantity}</p>
//       <p className="font-bold text-lg">Price: ${product.price}</p>

//       <input
//         type="number"
//         min="1"
//         max={product.quantity}
//         value={quantity}
//         onChange={(e) => setQuantity(Math.min(product.quantity, Math.max(1, Number(e.target.value))))}
//         className="border p-2 mt-2"
//       />

//       <button
//         onClick={handlePurchase}
//         disabled={product.quantity === 0}
//         className={`block mt-4 py-2 rounded-md w-full ${
//           product.quantity === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white"
//         }`}
//       >
//         {product.quantity === 0 ? "Out of Stock" : "Buy Now"}
//       </button>
//     </div>
//   );
// };

// export default ProductDetails;



import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/items/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id]);

  const handlePurchase = () => {
    if (quantity > product.quantity) {
      alert("Not enough stock available.");
      return;
    }

    fetch(`http://localhost:5000/api/items/${id}/buy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        navigate("/products");
      })
      .catch((error) => console.error("Error processing purchase:", error));
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="bg-gray-100 p-6 rounded-xl flex items-center justify-center">
        <img
          // src={product.image ? `http://localhost:5000${product.image}` : "/placeholder.jpeg"}
          src={product.image?.startsWith("http") ? product.image : `http://localhost:5000${product.image}`}
          alt={product.name}
          className="w-full max-w-md h-auto object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col justify-center space-y-6">
        <h1 className="text-4xl font-bold">{product.name}</h1>
        <p className="text-black font-semibold text-2xl">{product.details}</p>
        <p className="text-black text-sm leading-relaxed overflow-auto max-h-40">{product.moreDetails}</p>
        <p className="font-bold text-lg">Price: <span className="text-blue-600">${product.price}</span></p>
        <p className={`text-lg font-semibold ${product.quantity < 100 ? "text-red-600" : product.quantity < 300 ? "text-orange-500" : "text-green-600"}`}>
          Stock: {product.quantity}
        </p>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            -
          </button>
          <span className="text-xl font-bold">{quantity}</span>
          <button
            onClick={() => setQuantity((prev) => Math.min(product.quantity, prev + 1))}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            +
          </button>
        </div>

        <button
          onClick={handlePurchase}
          disabled={product.quantity === 0}
          className={`w-full py-3 text-lg font-bold rounded-lg transition-all ${
            product.quantity === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {product.quantity === 0 ? "Out of Stock" : "Buy now"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;