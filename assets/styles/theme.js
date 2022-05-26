import { createTheme } from "@rneui/themed";

const theme = createTheme({
  lightColors: {
    primary: "#fe9934",
    secondary: "#33C2FF",
    black: "#2f313f",
    grey0: "#818391",
    error: "#dc3545",
    white: "white",
    success: "#00cc6d",
  },
  darkColors: {
    primary: "#121212",
  },
  mode: "dark",
});

export default theme;
