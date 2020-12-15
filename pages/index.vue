<template>
  <div class="flex flex-col items-center">
    <h1 class="text-xl mb-8">
      {{ $t('index.welcome') }}
      <em>{{ $t('index.spoiler') }}</em>
    </h1>
    <Dog class="h-64 w-64"></Dog>

    <button class="button">
      <NuxtLink to="/find">{{ $t('index.find') }}</NuxtLink>
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Index',
  auth: false,
})
</script>

<style></style>
