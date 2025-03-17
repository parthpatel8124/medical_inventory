import { useEffect, useState } from "react";
import { getSettings } from "../api/settingsApi";

const BarcodeScanner = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      const settings = await getSettings();
      setEnabled(settings.barcodeScannerEnabled);
    }
    fetchSettings();
  }, []);

  if (!enabled) return null;

  return <div>Barcode Scanner Component</div>;
};

export default BarcodeScanner;
