import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "./auth";
import { useInfiniteQuery } from "@tanstack/react-query";

const BASE_ENDPOINT = `${process.env.BASE_ENDPOINT}`;

export const useHttpGet = (route, callback) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [feedback, setFeedback] = useState({ visible: false, message: "" });
  const { user } = useAuth();
  const { t } = useTranslation();

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      const controller = new AbortController();

      axios
        .get(`${BASE_ENDPOINT}${route}`, {
          signal: controller.signal,
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((res) => {
          setData((data) => data.concat(res.data));
          if (callback) callback(res.data);
          setLoading(false);
        })
        .catch(() => {
          setFeedback({ visible: true, message: t("somethingWentWrong") });
          setLoading(false);
        })
        .finally(() => setLoading(false));
      return () => controller.abort();
    }, [route])
  );

  return {
    data,
    loading,
    feedback,
    setFeedback,
  };
};

export const useHttpPost = (route, callback) => {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ visible: false, message: "" });
  const { user } = useAuth();
  const { t } = useTranslation();

  const makePost = (body) => {
    setLoading(true);

    axios
      .post(`${BASE_ENDPOINT}${route}`, body, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => callback(res.data))
      .catch(() => {
        setFeedback({ visible: true, message: t("somethingWentWrong") });
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  return {
    loading,
    feedback,
    setFeedback,
    makePost,
  };
};

export const useHttpPatch = (route, callback) => {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ visible: false, message: "" });
  const { user } = useAuth();
  const { t } = useTranslation();

  const makePatch = (body) => {
    setLoading(true);

    axios
      .patch(`${BASE_ENDPOINT}${route}`, body, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => callback(res.data))
      .catch(() => {
        setFeedback({ visible: true, message: t("somethingWentWrong") });
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  return {
    loading,
    feedback,
    setFeedback,
    makePatch,
  };
};

export const useHttpDelete = (route, callback) => {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ visible: false, message: "" });
  const { user } = useAuth();
  const { t } = useTranslation();

  const makeDelete = () => {
    setLoading(true);

    axios
      .delete(`${BASE_ENDPOINT}${route}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => callback(res.data))
      .catch(() => {
        setFeedback({ visible: true, message: t("somethingWentWrong") });
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  return {
    loading,
    feedback,
    setFeedback,
    makeDelete,
  };
};

export const useHttpGetFunc = (route, callback) => {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ visible: false, message: "" });
  const { user } = useAuth();
  const { t } = useTranslation();

  const makeGet = useCallback(() => {
    const controller = new AbortController();
    setLoading(true);

    axios
      .get(`${BASE_ENDPOINT}${route}`, {
        signal: controller.signal,
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        callback(res.data);
        setLoading(false);
      })
      .catch(() => {
        setFeedback({ visible: true, message: t("somethingWentWrong") });
        setLoading(false);
      });

    return () => controller.abort();
  }, [route, callback, user, BASE_ENDPOINT]);

  return {
    loading,
    feedback,
    setFeedback,
    makeGet,
  };
};

export const useGet = (route) => {
  const fetchData = async ({ pageParam = 1 }) => {
    const { data } = await axios.get(
      `${process.env.BASE_ENDPOINT}/posts/${postId}/get-likes?page=${pageParam}&limit=25`
    );
    return data;
  };

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(["model"], fetchData, {
      cacheTime: 0,
      getNextPageParam: (lastPage) => {
        if (lastPage.next !== null) {
          return lastPage.next;
        }
      },
    });

  return {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  };
};
