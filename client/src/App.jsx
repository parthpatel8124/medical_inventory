import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import InventoryPage from "./pages/InventoryPage";
import ItemsPage from "./pages/ItemsPage";
import SettingsPage from "./pages/SettingsPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
         <ScrollToTop />
        <main className="flex-1 ml-64 p-6 overflow-auto bg-gray-100">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/items" element={<ItemsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
