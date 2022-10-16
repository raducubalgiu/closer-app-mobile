import React from "react";
import { enableScreens } from "react-native-screens";
import CloserNavigation from "./navigation/CloserNavigation";
import { AuthProvider } from "./hooks/auth";
import { ThemeProvider } from "@rneui/themed";
import theme from "./assets/styles/theme";
import "./firebase/firebase.config";

enableScreens();

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CloserNavigation />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
