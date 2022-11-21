import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";
import CloserNavigation from "./navigation/CloserNavigation";
import { AuthProvider } from "./hooks/auth";
import { ThemeProvider } from "@rneui/themed";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import theme from "./assets/styles/theme";
import "./firebase/firebase.config";

enableScreens();
const queryClient = new QueryClient();

const App = () => {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <CloserNavigation />
          </ThemeProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </AuthProvider>
  );
};

export default App;
