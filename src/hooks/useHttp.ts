import axios from "axios";
import { useAuth } from "./auth";
import {
  useMutation,
  useQuery,
  useInfiniteQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

const BASE_ENDPOINT = `${process.env.BASE_ENDPOINT}`;

type PatchProps = {
  uri: string;
  onSuccess?: (res: any) => void;
  onError?: (err: any) => void;
  config?: {};
};

export function usePatch<T>({
  uri,
  onSuccess,
  onError,
  config = {},
}: PatchProps) {
  const { user } = useAuth();

  const mutations = useMutation(
    (body: T) =>
      axios.patch(`${BASE_ENDPOINT}${uri}`, body, {
        headers: { Authorization: `Bearer ${user?.token}` },
      }),
    {
      onSuccess,
      onError,
      ...config,
    }
  );

  return mutations;
}

type PostProps = {
  uri: string;
  onSuccess?: (res: any) => void;
  onError?: (err: any) => void;
  config?: {};
};

export function usePost<T>({
  uri,
  onSuccess,
  onError,
  config = {},
}: PostProps) {
  const { user } = useAuth();

  const mutations = useMutation(
    (body: T) =>
      axios.post(`${BASE_ENDPOINT}${uri}`, body, {
        headers: { Authorization: `Bearer ${user?.token}` },
      }),
    {
      onSuccess,
      onError,
      ...config,
    }
  );

  return mutations;
}

type DeleteProps = {
  uri: string;
  onSuccess?: (res: any) => void;
  onError?: (err: any) => void;
  config?: {};
};

export const useDelete = ({ uri, onSuccess, onError }: DeleteProps) => {
  const { user } = useAuth();

  const mutations = useMutation(
    () =>
      axios.delete(`${BASE_ENDPOINT}${uri}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      }),
    {
      onSuccess,
      onError,
    }
  );

  return mutations;
};

type GetProps = {
  model: string;
  uri: string;
  enableId?: string;
  options?: Omit<
    UseQueryOptions<any, unknown, any, (string | false | undefined)[]>,
    "initialData" | "queryFn" | "queryKey"
  > & { initialData?: (() => undefined) | undefined };
};

export const useGet = ({ model, uri, enableId = "", options }: GetProps) => {
  const { user } = useAuth();

  const response = useQuery(
    [model, uri, options?.enabled && enableId],
    async ({ signal }) => {
      return await axios.get(`${BASE_ENDPOINT}${uri}`, {
        signal,
        headers: { Authorization: `Bearer ${user?.token}` },
      });
    },
    options
  );

  return {
    ...response,
    data: response?.data?.data,
  };
};

type GetMutateProps = {
  uri: string;
  onSuccess?: (res: any) => void;
  onError?: (err: any) => void;
};

export const useGetMutate = ({
  uri,
  onSuccess = undefined,
  onError = undefined,
}: GetMutateProps) => {
  const { user } = useAuth();

  const mutations = useMutation(
    () =>
      axios.get(`${BASE_ENDPOINT}${uri}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      }),
    {
      onSuccess,
      onError,
    }
  );

  return mutations;
};

type GetPaginateProps = {
  model: string;
  uri: string;
  limit: string;
  queries?: string;
  enabled?: boolean;
};

export const useGetPaginate = ({
  model,
  uri,
  limit,
  queries = "",
  enabled = true,
}: GetPaginateProps) => {
  const { user } = useAuth();

  const fetchData = async (
    page: number,
    uri: string,
    limit: string,
    queries: string,
    signal: any
  ) => {
    const endpoint =
      queries?.length === 0
        ? `${process.env.BASE_ENDPOINT}${uri}?page=${page}&limit=${limit}`
        : `${process.env.BASE_ENDPOINT}${uri}?page=${page}&limit=${limit}&${queries}`;

    const { data } = await axios.get(endpoint, {
      signal,
      headers: { Authorization: `Bearer ${user?.token}` },
    });
    return data;
  };

  const response = useInfiniteQuery(
    [model, uri, limit, queries],
    ({ pageParam = 1, signal }) =>
      fetchData(pageParam, uri, limit, queries, signal),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.next !== null) {
          return lastPage.next;
        }
      },
      enabled,
    }
  );

  return { ...response };
};
