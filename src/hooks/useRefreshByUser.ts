import { useState } from "react";

export const useRefreshByUser = (refetch: () => Promise<any>) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const refetchByUser = () => {
    setRefreshing(true);

    setTimeout(() => {
      refetch().then(() => setRefreshing(false));
    }, 500);
  };

  return {
    refreshing,
    refetchByUser,
  };
};
