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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Index',
  auth: false,
})
</script>
