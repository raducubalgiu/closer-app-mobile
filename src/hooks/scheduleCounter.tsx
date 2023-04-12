import { useState, useContext, createContext, useMemo } from "react";
import { useAuth } from "./auth";
import { useGet } from "./useHttp";

interface ScheduleCounter {
  counter: number;
  increaseCounter: () => void;
  decreaseCounter: () => void;
}

const ScheduleCounterContext = createContext<ScheduleCounter>({
  counter: 0,
  increaseCounter: () => {},
  decreaseCounter: () => {},
});

export const ScheduleCounterProvider = ({ children }: { children: any }) => {
  const [counter, setCounter] = useState(0);
  const { user } = useAuth();

  useGet({
    model: "currentSchedules",
    uri: `/users/${user?.id}/schedules/current-schedules`,
    enableId: user?.id,
    options: {
      onSuccess: (res) => setCounter(res.data.currentSchedules),
      enabled: !!user?.id,
    },
  });

  const increaseCounter = () => setCounter((counter) => counter + 1);
  const decreaseCounter = () => setCounter((counter) => counter - 1);

  const memoedValue = useMemo(
    () => ({ counter, increaseCounter, decreaseCounter }),
    [counter]
  );

  return (
    <ScheduleCounterContext.Provider value={memoedValue}>
      {children}
    </ScheduleCounterContext.Provider>
  );
};

export const useScheduleCounter = () => useContext(ScheduleCounterContext);
