// ============================================================
// STAGE 3 - Two screens, and a way between them.
//
// A "stack" is a pile of screens. navigate() pushes one on top;
// the back button pops it off. You do not write the back button -
// the navigator knows there is something underneath.
//
// THE IMPORTANT DECISION IS ON LINE "birdId":
// we pass the bird's ID, not the bird object.
// A route param is a snapshot taken at navigate() time. If we passed
// the whole bird, the detail screen would keep showing the energy the
// bird had WHEN WE TAPPED IT, and never update. Passing the id means
// the screen looks the bird up in the live list every render.
//
// Read the props being threaded through <Stack.Screen> below. It is
// already awkward, and we only have two screens. Stage 4 fixes it.
// ============================================================
import { useState } from "react";
import {
  View, Text, Image, TextInput, Button, ScrollView, Pressable, StyleSheet
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

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

  function changeEnergy(birdId, difference) {
    setBirds(birds.map(bird => {
      if (bird.id === birdId) {
        return { ...bird, energy: bird.energy + difference };
      }
      return bird;
    }));
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Birds" options={{ title: "My birds" }}>
          {navigationProps => (
            <BirdsView
              {...navigationProps}
              birds={birds}
              onAdd={addBird}
              onRemove={removeBird}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Bird"
          options={({ route }) => ({ title: route.params.birdName })}
        >
          {navigationProps => (
            <BirdView
              {...navigationProps}
              birds={birds}
              onChangeEnergy={changeEnergy}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function BirdsView({ navigation, birds, onAdd, onRemove }) {
  const [newName, setNewName] = useState("");

  function addButtonPressed() {
    if (newName === "") {
      return;
    }
    onAdd(newName);
    setNewName("");
  }

  function birdRowPressed(bird) {
    navigation.navigate("Bird", { birdId: bird.id, birdName: bird.name });
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
            <Pressable style={styles.rowTouchArea} onPress={() => birdRowPressed(bird)}>
              <Text style={styles.name}>{bird.name}</Text>
              <Text style={styles.detail}>{bird.energy} J</Text>
            </Pressable>
            <Button title="Remove" color="#c0392b" onPress={() => onRemove(bird.id)} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function BirdView({ route, birds, onChangeEnergy }) {
  const birdId = route.params.birdId;

  const [gramsToEat, setGramsToEat] = useState("");
  const [kmsToFly, setKmsToFly] = useState("");

  // The live bird, looked up fresh on every render.
  const bird = birds.find(eachBird => eachBird.id === birdId);

  function eatButtonPressed() {
    onChangeEnergy(bird.id, Number(gramsToEat) * 4);
  }

  function flyButtonPressed() {
    onChangeEnergy(bird.id, -(10 + Number(kmsToFly) * 2));
  }

  return (
    <View style={styles.birdScreen}>
      <Text style={styles.energy}>{bird.name}'s energy: {bird.energy} J</Text>

      <Image
        style={styles.picture}
        source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Pied-winged_swallow_%28Hirundo_leucosoma%29.jpg/330px-Pied-winged_swallow_%28Hirundo_leucosoma%29.jpg" }}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.smallInput}
          keyboardType="numeric"
          placeholder="gr"
          value={gramsToEat}
          onChangeText={newText => setGramsToEat(newText)}
        />
        <Button title="Eat" onPress={eatButtonPressed} />
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.smallInput}
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

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16, gap: 10 },
  birdScreen: { flex: 1, alignItems: "center", padding: 20, gap: 16 },
  energy: { fontSize: 22, fontWeight: "600" },
  picture: { width: 300, height: 200, borderRadius: 8 },
  inputRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  smallInput: {
    borderWidth: 1, borderColor: "#999", borderRadius: 6,
    padding: 10, width: 140, fontSize: 16
  },
  input: {
    borderWidth: 1, borderColor: "#999", borderRadius: 6,
    padding: 10, fontSize: 16
  },
  row: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#eee"
  },
  rowTouchArea: { flex: 1 },
  name: { fontSize: 18, fontWeight: "600" },
  detail: { fontSize: 14, color: "#666" }
});
