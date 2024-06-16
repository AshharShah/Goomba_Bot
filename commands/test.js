import { InteractionResponseType } from "discord-interactions";
import { getRandomEmoji } from "../utils.js";

export function handleTestCommand(res) {
  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: "hello world " + getRandomEmoji(),
    },
  });
}
