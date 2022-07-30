import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { useCallback, useState } from "react";
import { useAuth } from "./auth";

const BASE_ENDPOINT = `${process.env.BASE_ENDPOINT}`;

export const useHttpGet = (route, callback) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({ visible: false, message: "" });
  const { user } = useAuth();

  useFocusEffect(
    useCallback(() => {
      const controller = new AbortController();

      axios
        .get(`${BASE_ENDPOINT}${route}`, {
          signal: controller.signal,
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((res) => {
          setData(res.data);
          if (callback) callback(res.data);
        })
        .catch((err) => {
          const { message } = err.response.data;
          setFeedback({ visible: true, message });
        })
        .finally(() => {
          setLoading(false);
        });
      return () => {
        controller.abort();
      };
    }, [route])
  );

  return {
    data,
    loading,
    feedback,
    setFeedback,
  };
};

export const useHttpPost = (route, body, updateState) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  axios
    .post(`${BASE_ENDPOINT}${route}`, body, {
      headers: { Authorization: `Bearer ${user.token}` },
    })
    .then((res) => updateState(res.data))
    .catch((err) => {
      setError(err);
      setLoading(false);
    })
    .finally(() => {
      setLoading(false);
    });

  return {
    loading,
    error,
  };
};
