import "dotenv/config";
import { capitalize, InstallGlobalCommands } from "./utils.js";

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

// This command is used to catch pokemons
const REGISTER_COMMAND = {
  name: "register",
  description: "Register your account!",
  type: 1,
};

const ALL_COMMANDS = [
  TEST_COMMAND,
  CHALLENGE_COMMAND,
  POKEMON_INFO_COMMAND,
  CATCH_POKEMON,
  COLLECTION_POKEMON,
  REGISTER_COMMAND,
];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
