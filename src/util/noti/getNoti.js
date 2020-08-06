import axios from "axios";

export const getNoti = async (id) => {
  const r = await axios.get(`http://localhost:5000/api/users/notifications/${id}`);

  return r.data;
};
