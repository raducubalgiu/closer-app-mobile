import React from "react";
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
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CloserNavigation />
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
