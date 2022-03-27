import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { enableScreens } from "react-native-screens";
import CloserNavigation from "./navigation/CloserNavigation";
import { AuthProvider } from "./context/auth";
import "./firebase/firebase.config";

enableScreens();

const fetchFonts = () => {
  return Font.loadAsync({
    "Exo-Black": require("./assets/fonts/static/Exo-Black.ttf"),
    "Exo-Bold": require("./assets/fonts/static/Exo-Bold.ttf"),
    "Exo-SemiBold": require("./assets/fonts/static/Exo-SemiBold.ttf"),
    "Exo-ExtraBold": require("./assets/fonts/static/Exo-ExtraBold.ttf"),
    "Exo-Light": require("./assets/fonts/static/Exo-Light.ttf"),
    "Exo-Regular": require("./assets/fonts/static/Exo-Regular.ttf"),
    "Exo-ExtraLight": require("./assets/fonts/static/Exo-ExtraLight.ttf"),
    "Exo-Medium": require("./assets/fonts/static/Exo-Medium.ttf"),
    "Exo-SemiBold": require("./assets/fonts/static/Exo-SemiBold.ttf"),
  });
};

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={() => setFontLoaded(false)}
      />
    );
  }

  return (
    <AuthProvider>
      <CloserNavigation />
    </AuthProvider>
  );
};

export default App;
