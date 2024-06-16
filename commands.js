import "dotenv/config";
import { getRPSChoices } from "./game.js";
import { capitalize, InstallGlobalCommands } from "./utils.js";

// Get the game choices from game.js
function createCommandChoices() {
  const choices = getRPSChoices();
  const commandChoices = [];

  for (let choice of choices) {
    commandChoices.push({
      name: capitalize(choice),
      value: choice.toLowerCase(),
    });
  }

  return commandChoices;
}

// Simple test command
const TEST_COMMAND = {
  name: "test",
  description: "Basic command",
  type: 1,
};

// Command containing options
const CHALLENGE_COMMAND = {
  name: "hadar",
  description: "My Introduction",
  type: 1,
};

// Command containing options
const POKEMON_INFO_COMMAND = {
  name: "pokedex",
  description: "Get Pokemon Info",
  type: 1,
  options: [
    {
      name: "name",
      description: "Enter the name of the Pokemon",
      type: 3,
      required: true,
    },
  ],
};

// This command is used to catch pokemons
const CATCH_POKEMON = {
  name: "catch",
  description: "Used To Catch A Pokemon",
  type: 1,
};

// This command is used to catch pokemons
const COLLECTION_POKEMON = {
  name: "collection",
  description: "View all the current Pokemons you have caught.",
  type: 1,
};

const ALL_COMMANDS = [
  TEST_COMMAND,
  CHALLENGE_COMMAND,
  POKEMON_INFO_COMMAND,
  CATCH_POKEMON,
  COLLECTION_POKEMON,
];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
