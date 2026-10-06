// ============================================================
// The SAME birds, drawn as pins instead of rows.
// Nothing here knows the list screen exists. Both ask the context.
// ============================================================
import MapView, { Marker } from "react-native-maps";
import { StyleSheet } from "react-native";
import { useBirds } from "../context/BirdsContext";

// A "region" is a centre point plus how many degrees to show around it.
// The map keeps the screen's aspect ratio, so the span you get is not
// always the span you asked for - widen it until your pins fit.
const STARTING_REGION = {
  latitude: 10,
  longitude: -25,
  latitudeDelta: 140,
  longitudeDelta: 140
};

export default function MapScreen({ navigation }) {
  const { birds } = useBirds();

  return (
    <MapView style={styles.map} initialRegion={STARTING_REGION}>
      {birds.map(bird => (
        <Marker
          key={bird.id}
          coordinate={{ latitude: bird.latitude, longitude: bird.longitude }}
          title={bird.name}
          description={Math.round(bird.energy) + " J"}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 }
});
