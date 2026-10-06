// ============================================================
// ONE list of birds, shared by every screen that needs it.
//
// Why a context: the birds list is needed by the Birds tab, the Map
// tab, and the Bird screen inside the stack. Passing it down as props
// would mean threading it through three navigators that do not care
// about birds at all.
// ============================================================
import { createContext, useContext, useState } from "react";
import { createBird, eat, fly } from "../model/bird";

const BirdsContext = createContext(null);

export function BirdsProvider({ children }) {
  const [birds, setBirds] = useState([
    createBird("Pepita", 56.1718, 10.1888),
    createBird("Pepona", -34.5614, -58.4627)
  ]);

  function addBird(name, latitude, longitude) {
    setBirds([...birds, createBird(name, latitude, longitude)]);
  }

  function removeBird(birdId) {
    setBirds(birds.filter(bird => bird.id !== birdId));
  }

  function feedBird(birdId, grams) {
    setBirds(birds.map(bird => {
      if (bird.id === birdId) {
        return eat(bird, grams);
      }
      return bird;
    }));
  }

  function flyBird(birdId, kilometres) {
    setBirds(birds.map(bird => {
      if (bird.id === birdId) {
        return fly(bird, kilometres);
      }
      return bird;
    }));
  }

  const value = { birds, addBird, removeBird, feedBird, flyBird };

  return (
    <BirdsContext.Provider value={value}>
      {children}
    </BirdsContext.Provider>
  );
}

// A named question, so screens do not have to know about contexts.
export function useBirds() {
  return useContext(BirdsContext);
}
