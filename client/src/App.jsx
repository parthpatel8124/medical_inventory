import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import InventoryPage from "./pages/InventoryPage";
import ItemsPage from "./pages/ItemsPage";
import SettingsPage from "./pages/SettingsPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetails from "./pages/ProductDetails";

// import { useEffect, useState } from "react";
// import { getSettings } from "./api/settingsApi"; 
// import { useTranslation } from "react-i18next";

function App() {

  // const [theme, setTheme] = useState("light");
  // useEffect(() => {
  //   async function fetchSettings() {
  //     const settings = await getSettings();
  //     setTheme(settings.theme || "light");
  //   }
  //   fetchSettings();
  // }, []);

  // const { i18n } = useTranslation();

  // useEffect(() => {
  //   async function fetchSettings() {
  //     const settings = await getSettings();
  //     i18n.changeLanguage(settings.language || "en");
  //   }
  //   fetchSettings();
  // }, [i18n]);
  return (
    // <div className={theme === "dark" ? "dark-mode" : "light-mode"}>
    <Router>
      <div className="flex">
        {/* Sidebar (Navigation) */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto bg-gray-100">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/items" element={<ItemsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
    // </div>
  );
}

export default App;
