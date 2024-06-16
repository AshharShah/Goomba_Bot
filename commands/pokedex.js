import { InteractionResponseType } from "discord-interactions";
import { getPokemonInfo } from "../utils.js";

export async function handlePokedexCommand(res, data) {
  const pokemonName = data.options[0].value;
  const pokemonDetails = await getPokemonInfo(pokemonName);

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
            title: pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1),
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
