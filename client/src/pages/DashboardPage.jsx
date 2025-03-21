// import { Package, AlertTriangle, Clock,Package2 } from "lucide-react";
// import DashboardCard from "../components/DashboardCard";

// const DashboardPage = () => {
//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold">Dashboard</h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
//         <DashboardCard title="Total Items" value="1,234" icon={Package} />
//         <DashboardCard title="Low Stock Alerts" value="12" icon={AlertTriangle} className="bg-yellow-100" />
//         <DashboardCard title="Expiring Soon" value="45" icon={Clock} />
//       </div>
//       <div className="mt-6 bg-white p-6 shadow rounded">
//         <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
//         {[1, 2, 3].map((i) => (
//           <div key={i} className="flex items-center gap-4 p-3 bg-gray-100 rounded-lg mb-2">
//             <div className="p-2 rounded-full bg-blue-100">
//               <Package2 size={16} className="text-blue-600" />
//             </div>
//             <div>
//               <p className="font-medium">Item stock updated</p>
//               <p className="text-sm text-gray-600">2 hours ago</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;


// DashboardPage.jsx
import { useState, useEffect } from "react";

import { Package, AlertTriangle, Clock } from "lucide-react";
import { useItems } from "../store/itemStore";
// import DashboardCard from "../components/DashboardCard";
import LowStockList from "../components/LowStockList";
import ExpiringSoonList from "../components/ExpiringSoonList";
import InventoryChart from "../components/Inventorychart";
import Notifications from "../components/Notifications";
import ExportData from "../components/ExportData";
import RestockSuggestions from "../components/RestockSuggestions";
import { NavLink } from "react-router-dom";

const DashboardPage = () => {
  const { items } = useItems();
  const [lowStockCount, setLowStockCount] = useState(0);
  const [expiringSoonCount, setExpiringSoonCount] = useState(0);
  const [view, setView] = useState("dashboard");


  useEffect(() => {
    setLowStockCount(items.filter((item) => item.quantity < 10).length);
    setExpiringSoonCount(
      items.filter((item) => new Date(item.expiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)).length
    );
  }, [items]);

  if (view === "lowStock") return <LowStockList setView={setView} />;
  if (view === "expiringSoon") return <ExpiringSoonList setView={setView} />;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-gray-600">Welcome to medical inventory system</p>
      
       {/* Cards */}
       <div className="grid grid-cols-3 gap-6">
        <NavLink to="/inventory">
          <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
            <Package className="w-10 h-10 text-blue-500" />
            <div>
              <p className="text-gray-600">Total Items</p>
              <p className="text-2xl font-bold">{items.length}</p>
            </div>
          </div>
        </NavLink>

        <div onClick={() => setView("lowStock")} className="cursor-pointer bg-yellow-100 p-6 rounded-lg shadow flex items-center space-x-4">
          <AlertTriangle className="w-10 h-10 text-yellow-500" />
          <div>
            <p className="text-gray-600">Low Stock Alerts</p>
            <p className="text-2xl font-bold">{lowStockCount}</p>
          </div>
        </div>

        <div onClick={() => setView("expiringSoon")} className="cursor-pointer bg-white p-6 rounded-lg shadow flex items-center space-x-4">
          <Clock className="w-10 h-10 text-blue-500" />
          <div>
            <p className="text-gray-600">Expiring Soon</p>
            <p className="text-2xl font-bold">{expiringSoonCount}</p>
          </div>
        </div>
      </div>
      
      <Notifications />
      <ExportData />
      <RestockSuggestions />
      <InventoryChart />
    </div>
  );
};

export default DashboardPage;
