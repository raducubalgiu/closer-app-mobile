import { useState } from "react";

export const useRefreshByUser = (refetch: () => void) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  async function refetchByUser() {
    setRefreshing(true);

    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }

  return {
    refreshing,
    refetchByUser,
  };
};
