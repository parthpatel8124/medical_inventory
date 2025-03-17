import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    axios.get("/api/settings").then((res) => setSettings(res.data));
  }, []);

  const updateSettings = async (newSettings) => {
    const res = await axios.put("/api/settings", newSettings);
    setSettings(res.data);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
