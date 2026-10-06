// ============================================================
// MANY birds. A list, a form to add one, a button to remove one.
// This screen owns no birds either - it asks the context.
// ============================================================
import { useState } from "react";
import {
  View, Text, TextInput, Button, FlatList, Pressable, StyleSheet
} from "react-native";
import { useBirds } from "../context/BirdsContext";

export default function BirdsScreen({ navigation }) {
  const { birds, addBird, removeBird } = useBirds();

  const [newName, setNewName] = useState("");
  const [newLatitude, setNewLatitude] = useState("");
  const [newLongitude, setNewLongitude] = useState("");

  function addButtonPressed() {
    if (newName === "") {
      return;
    }
    addBird(newName, Number(newLatitude), Number(newLongitude));
    setNewName("");
    setNewLatitude("");
    setNewLongitude("");
  }

  function birdRowPressed(bird) {
    // We hand over the id. The next screen looks the bird up itself.
    navigation.navigate("Bird", { birdId: bird.id, birdName: bird.name });
  }

  function renderBirdRow({ item }) {
    const bird = item;
    return (
      <View style={styles.row}>
        <Pressable style={styles.rowTouchArea} onPress={() => birdRowPressed(bird)}>
          <Text style={styles.name}>{bird.name}</Text>
          <Text style={styles.detail}>
            {Math.round(bird.energy)} J - {bird.latitude.toFixed(2)}, {bird.longitude.toFixed(2)}
          </Text>
        </Pressable>
        <Button title="Remove" color="#c0392b" onPress={() => removeBird(bird.id)} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="name"
          value={newName}
          onChangeText={newText => setNewName(newText)}
        />
        <View style={styles.coordinates}>
          <TextInput
            style={[styles.input, styles.half]}
            keyboardType="numbers-and-punctuation"
            placeholder="latitude"
            value={newLatitude}
            onChangeText={newText => setNewLatitude(newText)}
          />
          <TextInput
            style={[styles.input, styles.half]}
            keyboardType="numbers-and-punctuation"
            placeholder="longitude"
            value={newLongitude}
            onChangeText={newText => setNewLongitude(newText)}
          />
        </View>
        <Button title="Add bird" onPress={addButtonPressed} />
      </View>

      {/*
        In Stage 2 we drew this list with birds.map(). FlatList does the same
        job, but it only builds the rows that are actually on screen - with
        two birds you cannot tell the difference, with two thousand you can.
        keyExtractor is the key= you already know, moved out into its own prop.
      */}
      <FlatList
        data={birds}
        keyExtractor={bird => String(bird.id)}
        renderItem={renderBirdRow}
        ListEmptyComponent={<Text style={styles.detail}>No birds yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16 },
  form: { gap: 8, marginBottom: 20 },
  coordinates: { flexDirection: "row", gap: 8 },
  half: { flex: 1 },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 6,
    padding: 10,
    fontSize: 16
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  rowTouchArea: { flex: 1 },
  name: { fontSize: 18, fontWeight: "600" },
  detail: { fontSize: 14, color: "#666" }
});
