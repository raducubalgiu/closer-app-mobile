import { useState, useContext, createContext, useMemo, useEffect } from "react";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import { useAuth, useGet } from "../hooks";

type SchedulesCount = {
  status: string;
  currentSchedules: number;
};

interface IStore {
  location: LocationObject | null;
  schedulesCount: number;
  messagesCount: number;
  addSchedule: () => void;
  removeSchedule: () => void;
  addMessage: () => void;
  removeMessage: () => void;
}

const StoreContext = createContext<IStore>({
  location: null,
  messagesCount: 0,
  schedulesCount: 0,
  addSchedule: () => {},
  removeSchedule: () => {},
  addMessage: () => {},
  removeMessage: () => {},
});

export const StoreProvider = ({ children }: { children: any }) => {
  const { user } = useAuth();
  const [schedulesCount, setSchedulesCount] = useState(0);
  const [messagesCount, setMessagesCount] = useState(0);
  const [location, setLocation] = useState<LocationObject | null>(null);

  useGet<SchedulesCount>({
    model: "currentSchedules",
    uri: `/users/${user?.id}/schedules/current-schedules`,
    enableId: user?.id,
    options: {
      onSuccess: (res) =>
        res.data && setSchedulesCount(res.data.currentSchedules),
      enabled: !!user?.id,
    },
  });

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

  const addSchedule = () =>
    setSchedulesCount((schedulesCount) => schedulesCount + 1);
  const removeSchedule = () =>
    setSchedulesCount((schedulesCount) => schedulesCount - 1);
  const addMessage = () => {};
  const removeMessage = () => {};

  const memoedValue = useMemo(
    () => ({
      location,
      messagesCount,
      schedulesCount,
      addSchedule,
      removeSchedule,
      addMessage,
      removeMessage,
    }),
    [schedulesCount]
  );

  return (
    <StoreContext.Provider value={memoedValue}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
