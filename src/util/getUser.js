import axios from "axios";

export async function getUser(id) {
  const r = await axios.get(`http://localhost:5000/api/users/${id}`);
  return r.data;
}
