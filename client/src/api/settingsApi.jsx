export const getSettings = async () => {
    try {
      const response = await fetch("/api/settings");  // Adjust API route if needed
      return await response.json();
    } catch (error) {
      console.error("Error fetching settings:", error);
      return null;
    }
  };
  