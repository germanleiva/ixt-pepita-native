# Pepita, on your phone

The swallow you built in the browser, rebuilt as a real app that runs on your own
iPhone or Android phone. Same React. Different painter.

## Pick a branch

The app is built in four stages. **Each stage is a branch**, and each branch is a
complete, working app — not a fragment. Check out the stage you want:

```bash
git checkout stage-1
```

| Branch | The app does | New idea |
|---|---|---|
| `stage-1` | One bird: picture, energy, eat, fly | `View` `Text` `Image` `TextInput` `Button`, `StyleSheet` |
| `stage-2` | A list of birds you can add to and remove from | lifting state up, `.map()` with keys |
| `stage-3` | Tap a bird → its screen slides in, with a back button | stack navigation, **route params carry an id, not an object** |
| `stage-4` | Three tabs: the list, a world map, a settings switch | splitting into files, **Context** |
| `main` | Same as `stage-4`, plus a `stages/` folder holding all four for reference | — |

To see exactly what one stage added, ask git:

```bash
git diff stage-2 stage-3 -- App.js
```

## Run it

Once per clone:

```bash
npm install
```

Then, on any branch:

```bash
npx expo start
```

A QR code appears.

- **iPhone** — point the normal **Camera** app at it, tap the banner.
- **Android** — open **Expo Go** and scan from *inside* the app.

The dependencies are the same on every branch, so you can switch branches freely
without reinstalling anything.

---

## Before the first session — check your setup

Do this **before** class. If it fails, you will lose the session fixing it.

**1. Node, version 20 or newer.**

```bash
node --version
```

Nothing, or an older number? Install the LTS build from <https://nodejs.org>.

**2. Expo Go on your phone.** Search "Expo Go" in the App Store or Google Play.
You do **not** need Xcode. You do **not** need Android Studio. Your phone is the device.

**3. Prove it works.**

```bash
npm install
npx expo start
```

If the app opens on your phone, you are ready.

**4. If the QR code just spins.** Your laptop and phone must be on the same network,
and that network must let them talk to each other. University and café Wi-Fi often
block exactly that. The fix:

```bash
npx expo start --tunnel
```

Slower, but it goes around the network entirely. Try this before asking for help —
it solves most "it just sits there" problems.

**Windows:** use PowerShell, not the old `cmd`. Keep the project somewhere plain like
`C:\dev\` — a folder synced by OneDrive can break the file watcher.

---

## Things that will bite you

**The floating gear button eats your taps.** Expo Go draws a dev-tools button over the
top-right of your app. Anything underneath it will not receive touches. Open the dev
menu (shake the phone, or tap the gear) and turn **Tools button** off.

**After switching branches, reload the app.** Expo Go keeps running the code it
already loaded, so you will still be looking at the previous stage. Open the dev menu
(shake the phone, or tap the gear) and tap **Reload**.

**After editing navigation code, do a full reload.** Fast Refresh updates your
components but cannot re-register the native view types a navigator installs. If you
see `Tried to register two views with the same name`, open the dev menu and tap
**Reload**. Nothing is broken.

**The bird picture comes off the internet.** `source={{ uri: ... }}` is a network
request. No Wi-Fi, no bird. To make it work offline, put a `.jpg` in `assets/` and use
`source={require("./assets/bird.jpg")}` instead.

**The number keypad has no "done" key.** Once it is up, it stays up. That is a real
interaction design problem, not a bug in your code — and it is yours to solve.
