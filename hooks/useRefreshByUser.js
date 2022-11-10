import { useState } from "react";

export const useRefreshByUser = (refetch) => {
  const [refreshing, setRefreshing] = useState(false);

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
