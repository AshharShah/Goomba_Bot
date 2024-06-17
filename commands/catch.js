import { InteractionResponseType } from "discord-interactions";
import { getPokemonInfoByID } from "../utils.js";
import connection from "../database.js";

export async function handleCatchCommand(req, res) {
  let pokemonId;
  let pokemonDetails;
  // get the nickname of the user
  const userNickName = req.body.member.nick;

  // can use this to store pokemons in the database against each user paired with the pokemon id
  const userId = req.body.member.user.id;

  // Continuously fetch a valid Pokemon until one is found
  do {
    pokemonId = Math.floor(Math.random() * 1026);
    pokemonDetails = await getPokemonInfoByID(pokemonId);

    // Add a check to ensure pokemonDetails is not undefined and has the expected properties
    if (!pokemonDetails || pokemonDetails.name === "Error") {
      pokemonDetails = null;
    }
  } while (!pokemonDetails);

  // Insert the caught Pokemon into the database
  try {
    await connection.execute(
      "INSERT INTO caught_pokemons (user_id, pokemon_id) VALUES (?, ?)",
      [userId, pokemonId]
    );
  } catch (error) {
    console.error("Error inserting into database:", error);
    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content:
          "There was an error saving your caught Pokémon. Please try again later.",
      },
    });
  }

  // Send the response with the valid pokemonDetails
  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      embeds: [
        {
          color: 0x0099ff,
          title:
            userNickName +
            " caught " +
            pokemonDetails.name.charAt(0).toUpperCase() +
            pokemonDetails.name.slice(1),
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
