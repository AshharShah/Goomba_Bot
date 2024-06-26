import "dotenv/config";
import express from "express";
import { InteractionType, InteractionResponseType } from "discord-interactions";
import { VerifyDiscordRequest } from "./utils.js";
import { handleTestCommand } from "./commands/test.js";
import { handleHadarCommand } from "./commands/hadar.js";
import { handlePokedexCommand } from "./Commands/pokedex.js";
import { handleCatchCommand } from "./commands/catch.js";
import { handleCollectionCommand } from "./commands/collection.js";
import { checkRegister, handleUnregistered } from "./utils/checkRegistered.js";
import { handleRegisterCommand } from "./commands/register.js";

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;
// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 */
app.post("/interactions", async function (req, res) {
  // Interaction type and data
  const { type, data } = req.body;

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

    // handle the register command, to register a user into the database
    if (name === "register") {
      return handleRegisterCommand(req, res);
    }

    // check if the user is registered in the Pokemon Database
    let isRegistered = await checkRegister(req);
    if (isRegistered === false) {
      return handleUnregistered(req, res);
    }

    // "test" command
    if (name === "test") {
      return handleTestCommand(res);
    }

    if (name === "hadar") {
      return handleHadarCommand(res);
    }

    if (name === "pokedex") {
      return handlePokedexCommand(res, data);
    }

    if (name === "catch") {
      // console.log(req.body.member);
      return handleCatchCommand(req, res);
    }

    if (name === "collection") {
      return handleCollectionCommand(req, res);
    }
  }
});

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
