import axios from "axios";

export async function getBot(user) {
  console.log(user.bots);
  let bots = [];
  for (const botId of user.bots) {
    console.log(botId);
    const r = await axios.get(`http://localhost:5000/api/bots/${botId}`);
    bots.push(r.data);
  }

  return bots;
}
