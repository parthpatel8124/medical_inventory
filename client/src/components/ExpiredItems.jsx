// import { useEffect, useState } from "react";
// import axios from "axios";

// const ExpiredItems = () => {
//   const [expiredItems, setExpiredItems] = useState([]);

//   useEffect(() => {
//     const fetchExpiredItems = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/expired-items");
//         setExpiredItems(response.data);
//       } catch (error) {
//         console.error("Error fetching expired items:", error);
//       }
//     };

//     fetchExpiredItems();
//   }, []);

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-4">🛑 Expired Items</h2>
      
//       {expiredItems.length === 0 ? (
//         <p className="text-gray-600">No expired items found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border p-3 text-left">Item Name</th>
//                 <th className="border p-3 text-left">Quantity</th>
//                 <th className="border p-3 text-left">Expiry Date</th>
//                 <th className="border p-3 text-left">Moved At</th>
//               </tr>
//             </thead>
//             <tbody>
//               {expiredItems.map((item) => (
//                 <tr key={item._id} className="hover:bg-gray-50">
//                   <td className="border p-3">{item.name}</td>
//                   <td className="border p-3">{item.quantity}</td>
//                   <td className="border p-3 text-red-500">{new Date(item.expiryDate).toDateString()}</td>
//                   <td className="border p-3 text-gray-600">{new Date(item.movedAt).toDateString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExpiredItems;

import { useEffect, useState } from "react";
import axios from "axios";
import { AlertTriangle } from "lucide-react";

const ExpiredItems = () => {
  const [expiredItems, setExpiredItems] = useState([]);

  useEffect(() => {
    const fetchExpiredItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/expired-items");
        setExpiredItems(response.data);
      } catch (error) {
        console.error("Error fetching expired items:", error);
      }
    };

    fetchExpiredItems();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Expired Items</h1>
      {/* <p className="text-gray-600">List of items that have expired</p> */}

      {/* Summary Card */}
      <div className="bg-red-100 p-6 rounded-lg shadow flex items-center space-x-4">
        <AlertTriangle className="w-10 h-10 text-red-500" />
        <div>
          <p className="text-gray-600">Total Expired Items</p>
          <p className="text-2xl font-bold">{expiredItems.length}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Expired Items List</h2>
        {expiredItems.length === 0 ? (
          <p className="text-gray-600">No expired items found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-blue-500 text-white text-center uppercase text-sm tracking-wider">
                  <th className="p-4">Item Name</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4 ">Expiry Date</th>
                  {/* <th className="p-4">Moved At</th> */}
                </tr>
              </thead>
              <tbody className="text-center">
                {expiredItems.map((item, index) => (
                  <tr
                    key={item._id}
                    className={`border-b transition hover:bg-gray-200 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="p-4 font-medium text-gray-800">{item.name}</td>
                    <td className="p-4 text-gray-600">{item.quantity}</td>
                    <td className="p-4 text-red-500">{new Date(item.expiryDate).toDateString()}</td>
                    {/* <td className="p-4 text-gray-500">{new Date(item.movedAt).toDateString()}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpiredItems;


