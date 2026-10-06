// ============================================================
// STAGE 1 - One bird, one screen.
//
// Put this in App.js and look at it next to your web Pepita.
// The logic is IDENTICAL. Only four things changed:
//
//   <div>    ->  <View>          a box. No text goes directly in it.
//   <h1>     ->  <Text>          EVERY piece of text needs one.
//   <img>    ->  <Image>         needs a size; URLs go in source={{uri}}
//   <input>  ->  <TextInput>     onChange -> onChangeText, and the
//                                handler gets the TEXT, not an event.
//   <button> ->  <Button>        title=..., onPress=...  (not onClick)
//
// There is no CSS file. Styles are a JavaScript object.
// This is the whole point: React did not change. The painter did.
// ============================================================
import { useState } from "react";
import { View, Text, Image, TextInput, Button, StyleSheet } from "react-native";

export default function App() {
  return <Bird name="Pepita" />;
}

function Bird({ name }) {
  const [energy, setEnergy] = useState(0);
  const [gramsToEat, setGramsToEat] = useState("");
  const [kmsToFly, setKmsToFly] = useState("");

  function eatButtonPressed() {
    setEnergy(energy + Number(gramsToEat) * 4);
  }

  function flyButtonPressed() {
    setEnergy(energy - (10 + Number(kmsToFly) * 2));
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.energy}>{name}'s energy: {energy} J</Text>

      <Image
        style={styles.picture}
        source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Pied-winged_swallow_%28Hirundo_leucosoma%29.jpg/330px-Pied-winged_swallow_%28Hirundo_leucosoma%29.jpg" }}
      />

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="gr"
          value={gramsToEat}
          onChangeText={newText => setGramsToEat(newText)}
        />
        <Button title="Eat" onPress={eatButtonPressed} />
      </View>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="km"
          value={kmsToFly}
          onChangeText={newText => setKmsToFly(newText)}
        />
        <Button title="Fly" onPress={flyButtonPressed} />
      </View>
    </View>
  );
}

// The web had a .css file. Here the stylesheet is just an object.
// Same property names, camelCased: background-color -> backgroundColor.
const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: "center", justifyContent: "center", gap: 16 },
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
