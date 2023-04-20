import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigation from "./src/navigation";
import { AuthProvider } from "./src/hooks/auth";
import { LocationProvider } from "./src/hooks/locationPermission";
import { ThemeProvider } from "@rneui/themed";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import theme from "./assets/styles/theme";
import "./firebase/firebase.config";
import { RootSiblingParent } from "react-native-root-siblings";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";
import AppLoading from "expo-app-loading";
import dayjs from "dayjs";
import "dayjs/locale/ro";
import relativeTime from "dayjs/plugin/relativeTime";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import utc from "dayjs/plugin/utc";
import weekday from "dayjs/plugin/weekday";
import { ScheduleCounterProvider } from "./src/hooks/scheduleCounter";

dayjs.extend(weekday);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.locale("ro");

enableScreens();
const queryClient = new QueryClient();

const App = () => {
  let [isLoaded, setIsLoaded] = useState(false);

  let cacheResources = async () => {
    const images = [
      require("./assets/images/splash-screen.png"),
      require("./assets/images/avatar.jpg"),
    ];
    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });

    return Promise.all(cacheImages);
  };

  useEffect(() => {
    async function loadResources() {
      try {
        SplashScreen.preventAutoHideAsync();
        await cacheResources();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsLoaded(true);
        SplashScreen.hideAsync();
      }
    }

    loadResources();
  }, []);

  if (!isLoaded) {
    return <AppLoading />;
  }

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <LocationProvider>
          <ScheduleCounterProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <SafeAreaProvider>
                <RootSiblingParent>
                  <ThemeProvider theme={theme}>
                    <AppNavigation />
                  </ThemeProvider>
                </RootSiblingParent>
              </SafeAreaProvider>
            </GestureHandlerRootView>
          </ScheduleCounterProvider>
        </LocationProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
