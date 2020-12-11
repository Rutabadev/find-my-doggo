<template>
  <transition name="fade">
    <div
      v-if="errors.length"
      class="bg-red-200 dark:bg-red-500 dark:text-gray-50 p-2 mb-6 rounded-lg font-semibold"
    >
      <ul v-for="error in errors" :key="error">
        <li>{{ error.message || error }}</li>
      </ul>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
export default Vue.extend({
  props: {
    errors: {
      type: Array,
      required: true,
    } as PropOptions<string[]>,
  },
})
</script>

<style></style>
