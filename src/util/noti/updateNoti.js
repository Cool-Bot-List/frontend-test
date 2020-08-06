import axios from "axios";

export const updateNoti = async (message, method, userId) => {
  const r = await axios.put(`http://localhost:5000/api/users/notifications/`, {
    userId,
    message,
    method,
  });
  return r.data;
};
