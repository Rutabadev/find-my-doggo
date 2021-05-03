<template>
  <div class="flex flex-col items-center">
    <h1 class="text-xl mb-8 text-center">
      {{ $t('index.welcome') }}
      <em>{{ $t('index.spoiler') }}</em>
    </h1>
    <IconDog class="h-64 w-64"></IconDog>

    <NuxtLink class="button" to="/find">
      {{ $t('index.find') }}
    </NuxtLink>

    <button class="mt-6 button" @click="snack">Snack</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { snackbarStore } from '~/store'
export default Vue.extend({
  name: 'Index',
  auth: false,

  methods: {
    snack() {
      snackbarStore.showMessage({
        message: Math.random() > 0.5 ? 'miam' : 'nom nom',
      })
    },
  },
})
</script>
