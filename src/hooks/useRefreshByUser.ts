import { useState } from "react";
import { RefetchOptions, RefetchQueryFilters } from "@tanstack/react-query";

export const useRefreshByUser = (
  refetch: (
    options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined
  ) => Promise<any>
) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const refetchByUser = () => {
    setRefreshing(true);

    setTimeout(() => {
      refetch({
        refetchPage(lastPage, index, allPages) {
          return index === 0;
        },
      }).then(() => setRefreshing(false));
    }, 500);
  };

  return {
    refreshing,
    refetchByUser,
  };
};
