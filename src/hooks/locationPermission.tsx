import { useState, useEffect, useContext, createContext, useMemo } from "react";
import * as Location from "expo-location";
import { UserLocationPermissionScreen } from "../screens";

interface LocationContext {
  location: any;
}

const UserLocationContext = createContext<LocationContext>({
  location: null,
});

export const LocationProvider = ({ children }: { children: any }) => {
  const [location, setLocation] = useState<any>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        // Redirect to LocationPermission
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  const memoedValue = useMemo(() => ({ location }), [location]);

  return (
    <UserLocationContext.Provider value={memoedValue}>
      {children}
    </UserLocationContext.Provider>
  );
};

export const useUserLocation = () => useContext(UserLocationContext);
