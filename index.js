import axios from "axios";

import { Client, Intents } from "discord.js";

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

let data;

const getData = async () => {
  await axios
    .request({
      url: "https://api.hangang.msub.kr",
      method: "GET",
    })
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

client.once("ready", async () => {
  await getData();
  console.log("디스코드 봇이 준비되었습니다.");
});

client.on("message", async (message) => {
  if (message.author.bot) return;

  if (message.content === "!c") {
    const msg = `
\`\`\`ansi
${data.station}
${data.temp}
${data.time}
${data.type}
\`\`\`
`;
    message.channel.send(msg);
  }
});

client.login(
  "OTk2MDQxNzg3MzQ3MDUwNTQ3.GK6Jd8.VxtPeSPeeYxF0l3ZGHRdw_U4FwaSA9GZOPSvhQ"
);
