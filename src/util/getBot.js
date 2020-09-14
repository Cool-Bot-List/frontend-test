import axios from "axios";

export async function getBot(user) {
  // console.log(user.bots);
  // let bots = [];
  // for (const botId of user.bots) {
  //   const r = await axios.get(`http://localhost:5000/api/bots/${botId}`);
  //   bots.push(r.data);
  // }
  // console.log(bots);
  // return bots;
  const r = await axios.get(`http://localhost:5000/api/bots/663489614178418708`);
  return [r.data];
}
