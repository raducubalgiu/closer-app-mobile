import axios from "axios";
import { useAuth } from "./auth";
import { useMutation, useQuery, useInfiniteQuery } from "@tanstack/react-query";
import Toast from "react-native-root-toast";
import { useTranslation } from "react-i18next";

const BASE_ENDPOINT = `${process.env.BASE_ENDPOINT}`;

export function usePatch<T>({ uri, onSuccess = undefined }) {
  const { user } = useAuth();

  const mutations = useMutation(
    (body: T) =>
      axios.patch(`${BASE_ENDPOINT}${uri}`, body, {
        headers: { Authorization: `Bearer ${user?.token}` },
      }),
    {
      onSuccess,
      onError: (err) => console.log(err),
    }
  );

  return mutations;
}

export function usePost<T>({ uri, onSuccess = undefined, config = {} }) {
  const { user } = useAuth();
  const { t } = useTranslation();

  const mutations = useMutation(
    (body: T) =>
      axios.post(`${BASE_ENDPOINT}${uri}`, body, {
        headers: { Authorization: `Bearer ${user?.token}` },
      }),
    {
      onSuccess,
      onError: () => {
        Toast.show(t("somethingWentWrong"), {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
      },
      ...config,
    }
  );

  return mutations;
}

export const useDelete = ({ uri, onSuccess = undefined }) => {
  const { user } = useAuth();

  const mutations = useMutation(
    () =>
      axios.delete(`${BASE_ENDPOINT}${uri}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      }),
    {
      onSuccess,
      onError: (err) => console.log(err),
    }
  );

  return mutations;
};

export const useGet = ({
  model,
  uri,
  onSuccess = undefined,
  enabled = true,
  enableId = "",
  others = {},
}) => {
  const { user } = useAuth();

  const response = useQuery(
    [model, uri, enabled && enableId],
    async ({ signal }) => {
      return await axios.get(`${BASE_ENDPOINT}${uri}`, {
        signal,
        headers: { Authorization: `Bearer ${user.token}` },
      });
    },
    {
      onSuccess,
      onError: (err) => console.log(err),
      enabled,
      ...others,
    }
  );

  return {
    ...response,
    data: response?.data?.data,
  };
};

export const useGetMutate = ({ uri, onSuccess = undefined }) => {
  const { user } = useAuth();

  const mutations = useMutation(
    () =>
      axios.get(`${BASE_ENDPOINT}${uri}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      }),
    {
      onSuccess,
      onError: (err) => console.log(err),
    }
  );

  return mutations;
};

export const useGetPaginate = ({ model, uri, limit, enabled = true }) => {
  const { user } = useAuth();

  const fetchData = async (page, uri, limit, signal) => {
    const { data } = await axios.get(
      `${process.env.BASE_ENDPOINT}${uri}?page=${page}&limit=${limit}`,
      { signal, headers: { Authorization: `Bearer ${user?.token}` } }
    );
    return data;
  };

  const response = useInfiniteQuery(
    [model, uri, limit],
    ({ pageParam = 1, signal }) => fetchData(pageParam, uri, limit, signal),
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
