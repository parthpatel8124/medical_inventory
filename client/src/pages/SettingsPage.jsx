import { useSettings } from "../store/SettingsStore";
import { Moon, Sun, DollarSign, History } from "lucide-react";

const SettingsPage = () => {
  const { settings, updateSettings, purchaseHistory } = useSettings();

  const currencies = [
    { code: "USD", symbol: "$" },
    { code: "EUR", symbol: "€" },
    { code: "GBP", symbol: "£" },
    { code: "INR", symbol: "₹" },
  ];

  const toggleTheme = () => {
    updateSettings({ ...settings, theme: settings.theme === "light" ? "dark" : "light" });
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-primary">Settings</h1>

      {/* Theme Toggle */}
      <div className="bg-white p-6 rounded-lg shadow-lg transition-colors">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-primary">
          {settings.theme === "light" 
            ? <Sun className="w-5 h-5 text-yellow-500" /> 
            : <Moon className="w-5 h-5 text-blue-400" />
          }
          Theme
        </h2>
        <button
          onClick={toggleTheme}
          className="btn-primary px-4 py-2 rounded-lg transition-colors"
        >
          Switch to {settings.theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </div>

      {/* Currency Selection */}
      <div className="bg-white p-6 rounded-lg shadow-lg transition-colors">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-primary">
          <DollarSign className="w-5 h-5 text-green-500" />
          Currency
        </h2>
        <select
          value={settings.currency}
          onChange={(e) => updateSettings({ ...settings, currency: e.target.value })}
          className="w-full max-w-xs px-4 py-2 rounded-lg border transition-colors"
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.code} ({currency.symbol})
            </option>
          ))}
        </select>
      </div>

      {/* Purchase History */}
      <div className="bg-white p-6 rounded-lg shadow-lg transition-colors">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-primary">
          <History className="w-5 h-5 text-purple-500" />
          Purchase History
        </h2>
        <div className="overflow-x-auto rounded-lg border border-border-color">
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-3 text-left border-b">Item</th>
                <th className="p-3 text-left border-b">Quantity</th>
                <th className="p-3 text-left border-b">Amount</th>
                <th className="p-3 text-left border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {purchaseHistory.map((purchase) => (
                <tr key={purchase._id} className="border-b transition-colors">
                  <td className="p-3">{purchase.itemName}</td>
                  <td className="p-3">{purchase.quantity}</td>
                  <td className="p-3">{`${settings.currency} ${purchase.totalAmount}`}</td>
                  <td className="p-3">{new Date(purchase.purchaseDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
