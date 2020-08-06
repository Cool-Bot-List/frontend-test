import axios from "axios";

export const markAllRead = async (id) => {
  const r = await axios.put(`http://localhost:5000/api/users/notifications/all/${id}`);
  return r.data;
};
