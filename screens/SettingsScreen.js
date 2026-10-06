// ============================================================
// One switch. It changes a value in the settings context, and a
// completely different screen in a completely different tab redraws.
// ============================================================
import { View, Text, Switch, StyleSheet } from "react-native";
import { useSettings } from "../context/SettingsContext";

export default function SettingsScreen() {
  const { unitSystem, setUnitSystem } = useSettings();

  const usingImperial = unitSystem === "imperial";

  function switchFlipped(isOn) {
    if (isOn) {
      setUnitSystem("imperial");
    } else {
      setUnitSystem("metric");
    }
  }

  return (
    <View style={styles.screen}>
      <View style={styles.row}>
        <Text style={styles.label}>Imperial units</Text>
        <Switch value={usingImperial} onValueChange={switchFlipped} />
      </View>
      <Text style={styles.explanation}>
        {usingImperial
          ? "Feeding in ounces, flying in miles."
          : "Feeding in grams, flying in kilometres."}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 20, gap: 12 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  label: { fontSize: 18 },
  explanation: { fontSize: 15, color: "#666" }
});
