import axios from "axios";

export const getCurrentUser = async (token) => {
  return await axios.post(
    `${process.env.BASE_ENDPOINT}/users/current-user`,
    {},
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
