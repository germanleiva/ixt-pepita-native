// ============================================================
// ONE bird. The screen we built in Stage 1 - except that now the
// bird does not live here. It lives in the context, and this screen
// was told WHICH bird to show through the navigation route.
// ============================================================
import { useState } from "react";
import { View, Text, Image, TextInput, Button, StyleSheet } from "react-native";
import { useBirds } from "../context/BirdsContext";
import { useSettings } from "../context/SettingsContext";
import { toGrams, toKilometres, weightLabel, distanceLabel } from "../model/bird";

const SWALLOW_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Pied-winged_swallow_%28Hirundo_leucosoma%29.jpg/330px-Pied-winged_swallow_%28Hirundo_leucosoma%29.jpg";

export default function BirdScreen({ route }) {
  // The route carries an ID, not a bird. Why: see the slides.
  const birdId = route.params.birdId;

  const { birds, feedBird, flyBird } = useBirds();
  const { unitSystem } = useSettings();

  // These two belong to the screen, not to the bird: they are what
  // the user is in the middle of typing.
  const [amountToEat, setAmountToEat] = useState("");
  const [distanceToFly, setDistanceToFly] = useState("");

  const bird = birds.find(eachBird => eachBird.id === birdId);

  if (bird === undefined) {
    return <Text style={styles.energy}>This bird is gone.</Text>;
  }

  function eatButtonPressed() {
    const grams = toGrams(Number(amountToEat), unitSystem);
    feedBird(bird.id, grams);
    setAmountToEat("");
  }

  function flyButtonPressed() {
    const kilometres = toKilometres(Number(distanceToFly), unitSystem);
    flyBird(bird.id, kilometres);
    setDistanceToFly("");
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.energy}>
        {bird.name}'s energy: {Math.round(bird.energy)} J
      </Text>

      <Image style={styles.picture} source={{ uri: SWALLOW_IMAGE }} />

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder={weightLabel(unitSystem)}
          value={amountToEat}
          onChangeText={newText => setAmountToEat(newText)}
        />
        <Button title="Eat" onPress={eatButtonPressed} />
      </View>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder={distanceLabel(unitSystem)}
          value={distanceToFly}
          onChangeText={newText => setDistanceToFly(newText)}
        />
        <Button title="Fly" onPress={flyButtonPressed} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: "center", padding: 20, gap: 16 },
  energy: { fontSize: 22, fontWeight: "600" },
  picture: { width: 300, height: 200, borderRadius: 8 },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 6,
    padding: 10,
    width: 140,
    fontSize: 16
  }
});
