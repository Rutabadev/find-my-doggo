<template>
  <div>
    <h1 class="text-xl text-center mb-8">
      Find the doggo that bests suits you
      <em>(spoiler, all of them)</em>
    </h1>
    <Dog class="h-64 w-64 m-auto"></Dog>

    <NuxtLink
      to="/protected"
      class="text-blue-600 dark:text-blue-400 hover:underline"
      >Go to a protected page</NuxtLink
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
