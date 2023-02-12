import { Spinner } from "../components/core";

export const usePaginateActions = ({
  data,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
}: any) => {
  const { pages } = data || {};
  const result = pages?.map((page: any) => page.results).flat();

  const loadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  const showSpinner = () => {
    if (isFetchingNextPage) {
      return <Spinner sx={{ paddingVertical: 30 }} />;
    } else {
      return null;
    }
  };

  return {
    data: result,
    loadMore,
    showSpinner,
  };
};
