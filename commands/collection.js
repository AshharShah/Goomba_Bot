import { InteractionResponseType } from "discord-interactions";
import connection from "../database.js";
import { getPokemonInfoByID } from "../utils.js";

export async function handleCollectionCommand(req, res) {
  // user id
  const userId = req.body.member.user.id;
  // users nick name
  const userNickName = req.body.member.nick;

  // Query the database for all caught Pokémon for this user
  let caughtPokemons;
  try {
    const [rows] = await connection.execute(
      "SELECT pokemon_id FROM caught_pokemons WHERE user_id = ? ORDER BY timestamp DESC",
      [userId]
    );
    caughtPokemons = rows;
  } catch (error) {
    console.error("Error querying the database:", error);
    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content:
          "There was an error retrieving your Pokémon collection. Please try again later.",
      },
    });
  }

  if (caughtPokemons.length === 0) {
    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: "You haven't caught any Pokémon yet.",
      },
    });
  }

  // Fetch details for each caught Pokémon
  const pokemonDetailsPromises = caughtPokemons.map(async ({ pokemon_id }) => {
    const details = await getPokemonInfoByID(pokemon_id);
    return {
      name: details.name.charAt(0).toUpperCase() + details.name.slice(1),
      height: details.height,
      weight: details.weight,
      base_experience: details.base_experience,
      sprite: details.sprites?.animated || "default-image-url",
    };
  });

  const pokemonDetails = await Promise.all(pokemonDetailsPromises);

  // Format the response
  const fields = pokemonDetails.map((pokemon) => ({
    name: pokemon.name,
    value: `Height: ${pokemon.height}\nWeight: ${pokemon.weight}\nBase Experience: ${pokemon.base_experience}`,
    inline: true,
  }));

  // Send the response with the user's Pokémon collection
  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      embeds: [
        {
          color: 0xffff00,
          title: userNickName + "'s Pokémon Collection",
          fields: fields,
          footer: {
            text: "Last Caught Pokemon: " + fields[0].name,
          },
          image: {
            url: pokemonDetails[0].sprite,
          },
        },
      ],
    },
  });
}
