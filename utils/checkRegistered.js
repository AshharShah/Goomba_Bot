import connection from "../database.js";
import { InteractionResponseType } from "discord-interactions";

export async function checkRegister(req) {
  let userid = req.body.member.user.id;

  try {
    const [rows] = await connection.execute(
      "SELECT id FROM users WHERE id = ?",
      [userid]
    );

    // If the query returns a result, the user is registered
    return rows.length > 0;
  } catch (error) {
    console.error("Error querying the database:", error);
    return false;
  }
}

export function handleUnregistered(req, res) {
  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content:
        "User **" +
        req.body.member.nick +
        "** is not registred!\nKindly Use The Command: **/register**",
    },
  });
}
