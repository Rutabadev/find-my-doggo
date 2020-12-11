<template>
  <div>
    <h1 class="text-xl text-center mb-8">This is the landing page</h1>
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
