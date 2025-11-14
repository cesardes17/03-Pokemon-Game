<template>
  <section class="mt-5 flex flex-col">

    <button v-for="{ name, id } in options" :key="id" :disabled="blockSelection" @click="onOptionClicked(id)" :class="[
      // utilidades base
      'capitalize bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100 disabled:shadow-none disabled:bg-gray-100',
      // clases condicionales que cambian color según estado
      {
        // muestra correcto (verde) si el juego está bloqueado y la opción no es la seleccionada
        correct: id === correctAnswer && blockSelection,
        // muestra incorrecto (rojo) si el juego está bloqueado y la opción sí es la usada por el usuario
        incorrect: id !== correctAnswer && blockSelection && selectedOption === id
      }
    ]">
      {{ name }}
    </button>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Pokemon } from '../interfaces';


interface Props {
  options: Pokemon[];
  blockSelection: boolean;
  correctAnswer: number;
}

defineProps<Props>();

const emit = defineEmits<{
  selectedOption: [id: number];

}>()

const selectedOption = ref<number | null>(null);

const onOptionClicked = (id: number) => {
  emit('selectedOption', id)

  selectedOption.value = id;

}

</script>


<style scoped>
@reference "../../../assets/styles.css";

.correct {
  @apply bg-green-500 text-white;
}

.incorrect {
  @apply bg-red-300 opacity-70;
}
</style>
