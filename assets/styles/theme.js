import { createTheme } from "@rneui/themed";

const theme = createTheme({
  lightColors: {
    primary: "#fe9934",
    secondary: "#00ccff",
    black: "#2f313f",
    grey0: "#818391",
    error: "#dc3545",
    white: "white",
  },
  darkColors: {
    primary: "#121212",
  },
  mode: "dark",
});

export default theme;
