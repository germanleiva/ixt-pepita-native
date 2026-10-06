// ============================================================
// One setting, shared by the whole app: which unit system to show.
// The Settings tab writes it. The Bird screen reads it.
// They never meet each other in the navigation tree.
// ============================================================
import { createContext, useContext, useState } from "react";

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [unitSystem, setUnitSystem] = useState("metric");

  const value = { unitSystem, setUnitSystem };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
