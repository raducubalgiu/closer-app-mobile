import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { useCallback, useState } from "react";
import { useAuth } from "./auth";

const BASE_ENDPOINT = `${process.env.BASE_ENDPOINT}`;

export const useHttpGet = (route) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ visible: false, message: "" });
  const { user } = useAuth();

  useFocusEffect(
    useCallback(() => {
      const controller = new AbortController();

      const fetchData = async () => {
        setLoading(true);
        axios
          .get(`${BASE_ENDPOINT}${route}`, {
            signal: controller.signal,
            headers: { Authorization: `Bearer ${user.token}` },
          })
          .then((res) => {
            setData(res.data);
          })
          .catch((err) => {
            const { message } = err.response.data;
            setFeedback({ visible: true, message });
          })
          .finally(() => {
            setLoading(false);
          });
      };

      fetchData();

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

export const useHttpPost = (route, body, liftState) => {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ visible: false, message: "" });
  const { user } = useAuth();

  const fetchData = useCallback(() => {
    setLoading(true);
    axios
      .post(`${BASE_ENDPOINT}${route}`, body, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => liftState(res.data))
      .catch((err) => {
        const { message } = err.response.data;
        setFeedback({ visible: true, message });
      })
      .finally(() => {
        setLoading(false);
        setFeedback(feedback);
      });
  }, [route, body]);

  return {
    fetchData,
    loading,
    feedback,
    setFeedback,
  };
};
