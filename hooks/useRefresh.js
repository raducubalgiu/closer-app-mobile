import { useCallback, useState } from "react";

export const useRefresh = (handleRefresh) => {
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    await wait(1000).then(() => {
      setRefreshing(false);
    });

    await handleRefresh();
  }, []);

  return {
    onRefresh,
    refreshing,
  };
};
