import { Link } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, PlusCircle, Settings,Package } from "lucide-react";


const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-100 h-screen p-5">
      <h1 className="text-xl font-bold text-blue-700">MedInventory</h1>
      <nav className="mt-6 space-y-3">
        <Link to="/" className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-200">
          <LayoutDashboard className="w-5 h-5" /> Dashboard
        </Link>
        <Link to="/inventory" className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-200">
          <Package className="w-5 h-5" /> Inventory
        </Link>
        <Link to="/items" className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-200">
          <PlusCircle className="w-5 h-5" /> Items
        </Link>
        <Link to="/products" className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-200">
        <ShoppingBag className="w-5 h-5" />Products
        </Link>
        <Link to="/settings" className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-200">
          <Settings className="w-5 h-5" /> Settings
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;


