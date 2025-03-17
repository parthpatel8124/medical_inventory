import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useItems } from "../store/itemStore";

const InventoryChart = () => {
  const { items } = useItems();

  // Dummy sales & restock trends (replace with real API data if available)
  const data = [
    { month: "Jan", sales: 30, restock: 50 },
    { month: "Feb", sales: 50, restock: 40 },
    { month: "Mar", sales: 70, restock: 60 },
    { month: "Apr", sales: 90, restock: 80 },
    { month: "May", sales: 100, restock: 110 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Sales & Restock Trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#8884d8" />
          <Line type="monotone" dataKey="restock" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InventoryChart;
