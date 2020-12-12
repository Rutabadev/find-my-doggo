<template>
  <div>
    <h1 class="text-xl text-center mb-8">
      {{ $t('index.welcome') }}
      <em>{{ $t('index.spoiler') }}</em>
    </h1>
    <Dog class="h-64 w-64 m-auto"></Dog>

    <NuxtLink
      :to="localePath('/protected')"
      class="text-blue-600 dark:text-blue-400 hover:underline"
      >{{ $t('index.goProtected') }}</NuxtLink
    >
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  auth: false,
})
</script>

<style></style>
