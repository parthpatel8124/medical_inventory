// const SettingsPage = () => {
//     return (
//       <div className="p-6">
//         <h1 className="text-2xl font-bold">Settings</h1>
//         <p className="text-gray-600">Configure system preferences.</p>
//       </div>
//     );
//   };
  
//   export default SettingsPage;

import { useState, useEffect } from "react";

const SettingsPage = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [language, setLanguage] = useState("English");
  const [lowStockThreshold, setLowStockThreshold] = useState(5);
  const [expiryNotification, setExpiryNotification] = useState(7);
  const [sortingMethod, setSortingMethod] = useState("Name");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [barcodeEnabled, setBarcodeEnabled] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Settings</h2>
      <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        {/* Theme Selection */}
        <div className="flex justify-between items-center">
          <span>Theme</span>
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Toggle {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </div>

        {/* Language Selection */}
        <div className="flex justify-between items-center">
          <span>Language</span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border px-4 py-2 rounded-lg"
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
        </div>

        {/* Inventory Customization */}
        <div>
          <h3 className="text-lg font-semibold">Inventory Customization</h3>
          <div className="flex justify-between items-center mt-2">
            <span>Low Stock Alert Threshold</span>
            <input
              type="number"
              value={lowStockThreshold}
              onChange={(e) => setLowStockThreshold(e.target.value)}
              className="border px-4 py-2 rounded-lg w-20"
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <span>Expiry Notification Time (days)</span>
            <input
              type="number"
              value={expiryNotification}
              onChange={(e) => setExpiryNotification(e.target.value)}
              className="border px-4 py-2 rounded-lg w-20"
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <span>Default Sorting Method</span>
            <select
              value={sortingMethod}
              onChange={(e) => setSortingMethod(e.target.value)}
              className="border px-4 py-2 rounded-lg"
            >
              <option value="Name">Name</option>
              <option value="Quantity">Quantity</option>
              <option value="Expiry Date">Expiry Date</option>
            </select>
          </div>
        </div>

        {/* Notifications & Alerts */}
        <div>
          <h3 className="text-lg font-semibold">Notifications & Alerts</h3>
          <div className="flex justify-between items-center mt-2">
            <span>Enable Notifications</span>
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={() => setNotificationsEnabled(!notificationsEnabled)}
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <span>Email Alerts</span>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={() => setEmailAlerts(!emailAlerts)}
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <span>Sound Alerts</span>
            <input
              type="checkbox"
              checked={soundAlerts}
              onChange={() => setSoundAlerts(!soundAlerts)}
            />
          </div>
        </div>

        {/* Barcode Scanner Integration */}
        <div className="flex justify-between items-center">
          <span>Enable Barcode Scanning</span>
          <input
            type="checkbox"
            checked={barcodeEnabled}
            onChange={() => setBarcodeEnabled(!barcodeEnabled)}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
