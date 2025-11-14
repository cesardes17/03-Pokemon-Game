import { computed, onMounted, ref } from 'vue';
import { GameStatus, type Pokemon, type PokemonListResponse } from '../interfaces';
import { pokemonApi } from '../api/pokemon';
import confetti from 'canvas-confetti';
export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const pokemons = ref<Pokemon[]>([]);
  const pokemonsOptions = ref<Pokemon[]>([]);

  const randomPokemon = computed(() => {
    const randomindex = Math.floor(Math.random() * pokemonsOptions.value.length);
    return pokemonsOptions.value[randomindex];
  });

  const isLoading = computed(() => pokemons.value.length === 0);

  const getPokemons = async (): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonListResponse>('/?limit=151');

    const pokemonArray: Pokemon[] = response.data.results.map((pokemon) => {
      const urlParts = pokemon.url.split('/');
      const id = urlParts.at(-2) ?? 0;
      return {
        name: pokemon.name,
        id: +id,
      };
    });

    return pokemonArray.sort(() => Math.random() - 0.5);
  };

  const getNextRound = (howMany = 4) => {
    gameStatus.value = GameStatus.Playing;
    pokemonsOptions.value = pokemons.value.splice(0, howMany);
  };

  const onSelectedOption = (id: number) => {
    console.log({ id });
    if (randomPokemon.value === undefined) return;

    const hasWon = randomPokemon.value.id === id;

    if (hasWon) {
      gameStatus.value = GameStatus.Won;
      confetti({
        particleCount: 300,
        spread: 160,

        origin: { y: 0.6 },
      });
      return;
    } else {
      gameStatus.value = GameStatus.Lost;
      return;
    }
  };

  onMounted(async () => {
    pokemons.value = await getPokemons();
    getNextRound();

    console.log(pokemonsOptions.value);
  });

  return {
    gameStatus,
    isLoading,
    randomPokemon,
    pokemonsOptions,
    // Methods
    onSelectedOption,
    getNextRound,
  };
};
