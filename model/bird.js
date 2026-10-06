// ============================================================
// THE MODEL — plain JavaScript. No React, no screens, no navigation.
// You could run this file in Node with no phone at all.
//
// The model speaks ONE set of units: grams and kilometres.
// Ounces and miles are a thing the INTERFACE does, not the bird.
// ============================================================

let nextId = 1;

export function createBird(name, latitude, longitude) {
  return {
    id: nextId++,
    name: name,
    energy: 0,
    latitude: latitude,
    longitude: longitude
  };
}

export function eat(bird, grams) {
  return { ...bird, energy: bird.energy + grams * 4 };
}

export function fly(bird, kilometers) {
  return { ...bird, energy: bird.energy - (10 + kilometers * 2) };
}

// ---------- units: the view's problem, not the bird's ----------

const GRAMS_PER_OUNCE = 28.3495;
const KILOMETRES_PER_MILE = 1.60934;

export function toGrams(amount, unitSystem) {
  if (unitSystem === "imperial") {
    return amount * GRAMS_PER_OUNCE;
  }
  return amount;
}

export function toKilometres(distance, unitSystem) {
  if (unitSystem === "imperial") {
    return distance * KILOMETRES_PER_MILE;
  }
  return distance;
}

export function weightLabel(unitSystem) {
  if (unitSystem === "imperial") {
    return "ounces";
  }
  return "gr";
}

export function distanceLabel(unitSystem) {
  if (unitSystem === "imperial") {
    return "miles";
  }
  return "km";
}
