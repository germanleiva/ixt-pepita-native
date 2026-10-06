// ============================================================
// THE WHOLE SHAPE OF THE APP, in one readable file.
//
//   SettingsProvider   <- the unit system lives here
//     BirdsProvider    <- the birds live here
//       Tabs
//         Birds  -> Stack: BirdsScreen -> BirdScreen (with a back button)
//         Map    -> MapScreen
//         Settings -> SettingsScreen
//
// Read the indentation: a provider must sit ABOVE every screen that
// needs its state. That is the whole rule.
// ============================================================
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { StatusBar } from "expo-status-bar";

import { BirdsProvider } from "./context/BirdsContext";
import { SettingsProvider } from "./context/SettingsContext";
import BirdsScreen from "./screens/BirdsScreen";
import BirdScreen from "./screens/BirdScreen";
import MapScreen from "./screens/MapScreen";
import SettingsScreen from "./screens/SettingsScreen";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

// The first tab is not a screen, it is a stack of screens.
function BirdsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Birds" component={BirdsScreen} options={{ title: "My birds" }} />
      <Stack.Screen
        name="Bird"
        component={BirdScreen}
        options={({ route }) => ({ title: route.params.birdName })}
      />
    </Stack.Navigator>
  );
}

function tabIcon(emoji) {
  return () => <Text style={{ fontSize: 20 }}>{emoji}</Text>;
}

export default function App() {
  return (
    <SettingsProvider>
      <BirdsProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Tabs.Navigator>
            <Tabs.Screen
              name="BirdsTab"
              component={BirdsStack}
              options={{ title: "Birds", headerShown: false, tabBarIcon: tabIcon("\u{1F426}") }}
            />
            <Tabs.Screen
              name="MapTab"
              component={MapScreen}
              options={{ title: "Map", tabBarIcon: tabIcon("\u{1F30D}") }}
            />
            <Tabs.Screen
              name="SettingsTab"
              component={SettingsScreen}
              options={{ title: "Settings", tabBarIcon: tabIcon("⚙️") }}
            />
          </Tabs.Navigator>
        </NavigationContainer>
      </BirdsProvider>
    </SettingsProvider>
  );
}
