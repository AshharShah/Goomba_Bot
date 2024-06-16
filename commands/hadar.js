import { InteractionResponseType } from "discord-interactions";

export function handleHadarCommand(res) {
  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: "My Name Is Hadar, I am Big GAY.",
      embeds: [
        {
          title: "BELOW IS A BIG GAY!",
          image: {
            url: "https://instagram.flhe3-1.fna.fbcdn.net/v/t51.2885-19/330832507_2373425629501897_5727183638491697557_n.jpg?_nc_ht=instagram.flhe3-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=X3Q3PhSjAJMQ7kNvgFZbTiU&edm=APHcPcMBAAAA&ccb=7-5&oh=00_AYC8zSEehxZQJgvXvp3pTBdZCMBU33bgg08P_XykFzURuw&oe=6673C703&_nc_sid=cf751b",
          },
        },
      ],
    },
  });
}
