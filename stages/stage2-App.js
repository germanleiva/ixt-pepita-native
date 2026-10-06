// ============================================================
// STAGE 2 - Many birds. A list, a field to add one, a way to remove one.
//
// Notice WHERE the state lives. The list of birds is not inside
// BirdsView, it is inside App, and BirdsView receives it as props.
// That is "lifting state up", same as on the web - because in a
// moment a second screen will need the same birds.
//
// The bird list is drawn with .map(), exactly as you did in week 40.
// Each child needs a key, for exactly the same reason.
//
// When you run this you will notice something is missing: the Bird
// screen from Stage 1 is still in this file, and there is no way to
// reach it. That is what Stage 3 is for.
// ============================================================
import { useState } from "react";
import {
  View, Text, TextInput, Button, ScrollView, StyleSheet
} from "react-native";

let nextId = 1;

function createBird(name) {
  return { id: nextId++, name: name, energy: 0 };
}

export default function App() {
  const [birds, setBirds] = useState([createBird("Pepita"), createBird("Pepona")]);

  function addBird(name) {
    setBirds([...birds, createBird(name)]);
  }

  function removeBird(birdId) {
    setBirds(birds.filter(bird => bird.id !== birdId));
  }

  return <BirdsView birds={birds} onAdd={addBird} onRemove={removeBird} />;
}

function BirdsView({ birds, onAdd, onRemove }) {
  const [newName, setNewName] = useState("");

  function addButtonPressed() {
    if (newName === "") {
      return;
    }
    onAdd(newName);
    setNewName("");
  }

  return (
    <View style={styles.screen}>
      <TextInput
        style={styles.input}
        placeholder="name"
        value={newName}
        onChangeText={newText => setNewName(newText)}
      />
      <Button title="Add bird" onPress={addButtonPressed} />

      <ScrollView>
        {birds.map(bird => (
          <View style={styles.row} key={bird.id}>
            <Text style={styles.name}>{bird.name}</Text>
            <Button title="Remove" color="#c0392b" onPress={() => onRemove(bird.id)} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // paddingTop keeps us clear of the status bar and the Dynamic Island.
  // From Stage 3 on, the navigator draws a header and does this for us.
  screen: { flex: 1, padding: 16, paddingTop: 100, gap: 10 },
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
  name: { fontSize: 18, fontWeight: "600" }
});
