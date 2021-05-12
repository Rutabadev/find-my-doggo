<template>
  <transition name="shake">
    <div
      v-if="errors.length"
      class="bg-red-200 dark:bg-red-500 dark:text-gray-50 p-2 rounded-lg font-semibold shake"
    >
      <ul>
        <li v-for="error in errors" :key="error">
          {{ error }}
        </li>
      </ul>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
export default Vue.extend({
  props: {
    errors: {
      type: Array as PropType<string[]>,
      required: true,
      default: [],
    },
  },
})
</script>
