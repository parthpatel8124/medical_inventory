import { Link } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, PlusCircle, Settings, Package } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 w-64  h-screen p-5 overflow-y-auto">
      <h1 className="text-xl font-bold">MedInventory</h1>
      <nav className="mt-6 space-y-3">
        <Link 
          to="/" 
          className="flex items-center gap-2 p-3 rounded-lg transition-all hover:text-blue-700"
        >
          <LayoutDashboard className="w-5 h-5" /> Dashboard
        </Link>
        <Link 
          to="/inventory" 
          className="flex items-center gap-2 p-3 rounded-lg transition-all hover:text-blue-700 "
        >
          <Package className="w-5 h-5" /> Inventory
        </Link>
        <Link 
          to="/items" 
          className="flex items-center gap-2 p-3 rounded-lg  transition-all hover:text-blue-700"
        >
          <PlusCircle className="w-5 h-5" /> Items
        </Link>
        <Link 
          to="/products" 
          className="flex items-center gap-2 p-3 rounded-lg  transition-all hover:text-blue-700"
        >
          <ShoppingBag className="w-5 h-5" /> Products
        </Link>
        <Link 
          to="/settings" 
          className="flex items-center gap-2 p-3 rounded-lg transition-all hover:text-blue-700"
        >
          <Settings className="w-5 h-5" /> Settings
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;


