import axios from "axios";

export const createOrUpdateUser = async (token) => {
  return await axios.post(
    `http://192.168.100.2:8000/api/v1/users/create-or-update-user`,
    {},
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const getCurrentUser = async (token) => {
  return await axios.post(
    `http://192.168.100.2:8000/api/v1/users/current-user`,
    {},
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
