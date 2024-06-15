import "dotenv/config";
import express from "express";
import {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
  MessageComponentTypes,
  ButtonStyleTypes,
} from "discord-interactions";
import {
  VerifyDiscordRequest,
  getRandomEmoji,
  DiscordRequest,
  getPokemonInfo,
} from "./utils.js";
import { getShuffledOptions, getResult } from "./game.js";

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;
// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

// Store for in-progress games. In production, you'd want to use a DB
const activeGames = {};

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 */
app.post("/interactions", async function (req, res) {
  // Interaction type and data
  const { type, id, data } = req.body;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;
    // "test" command
    if (name === "test") {
      // Send a message into the channel where command was triggered from
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random emoji to send from a helper function
          content: "hello world " + getRandomEmoji(),
        },
      });
    }

    if (name === "hadar") {
      // Send a message into the channel where command was triggered from
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random emoji to send from a helper function
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

    if (name === "pokedex") {
      const pokemonName = data.options[0].value;
      const pokemonDetails = getPokemonInfo(pokemonName);

      if (pokemonDetails.name === "Error") {
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `Pokemon: ${pokemonName} was not found in the Pokedex!`,
          },
        });
      } else {
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            embeds: [
              {
                color: 0x0099ff,
                title:
                  pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1),
                fields: [
                  {
                    name: "Height",
                    value: pokemonDetails.height.toString(),
                    inline: true,
                  },
                  {
                    name: "Weight",
                    value: pokemonDetails.weight.toString(),
                    inline: true,
                  },
                  {
                    name: "Base Experience",
                    value: pokemonDetails.base_experience.toString(),
                    inline: true,
                  },
                ],
                image: {
                  url: pokemonDetails.sprites?.animated || "default-image-url",
                },
              },
            ],
          },
        });
      }
    }
  }
});

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
