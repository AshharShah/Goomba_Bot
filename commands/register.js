import { InteractionResponseType } from "discord-interactions";
import connection from "../database.js";
import { checkRegister } from "../utils/checkRegistered.js";
import { capitalize } from "../utils.js";

export async function handleRegisterCommand(req, res) {
  const id = req.body.member.user.id;
  const username = req.body.member.user.username;
  const global_name = req.body.member.user.global_name;

  let registered = await checkRegister(req);

  try {
    if (registered === true) {
      // User is already registered
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `User ${username} is already registered.`,
        },
      });
    }

    // Insert the user into the database with 10 initial Pokéballs
    await connection.execute(
      "INSERT INTO users (id, username, global_name, pokeballs) VALUES (?, ?, ?, ?)",
      [id, username, global_name, 10]
    );

    // Send a success message
    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content:
          "User **" +
          capitalize(username) +
          "** has been successfully registered with 10 Pokéballs.",
      },
    });
  } catch (error) {
    console.error("Error registering the user:", error);
    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `An error occurred while registering user ${username}.`,
      },
    });
  }
}
