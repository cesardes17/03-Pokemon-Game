<template>

  <section v-if="isLoading || randomPokemon === undefined"
    class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="text-3xl">Espere por favor</h1>
    <h3 class="animate-pulse">Cargando Pokémons</h3>
  </section>


  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">

    <div
      class="flex flex-col items-start gap-2 p-4 bg-linear-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 text-white">
      <h3 class="flex items-center gap-2 text-lg">
        🟢 <span class="font-medium">Ganadas:</span>
        <span class="font-bold">{{ wins }}</span>
      </h3>

      <h3 class="flex items-center gap-2 text-lg">
        🔴 <span class="font-medium">Perdidas:</span>
        <span class="font-bold">{{ losses }}</span>
      </h3>
    </div>




    <h1 class="m-5">¿Quién es este Pokémon?</h1>

    <div class="h-20">
      <button v-if="gameStatus !== GameStatus.Playing" @click="getNextRound()"
        class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-800 transition-all">¿Quieres Volver a Jugar?</button>

    </div>
    <!-- Pokemon Picture -->
    <PokemonPicture :pokemon-id="randomPokemon.id" :show-pokemon="gameStatus !== GameStatus.Playing" />


    <!-- Pokemon Options -->
    <PokemonOptions :options="pokemonsOptions" @selected-option="onSelectedOption"
      :block-selection="gameStatus !== GameStatus.Playing" :correct-answer="randomPokemon.id" />


  </section>
</template>

<script setup lang="ts">

import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces';

const { gameStatus, isLoading, randomPokemon, pokemonsOptions, wins, losses, onSelectedOption, getNextRound } = usePokemonGame();


</script>
