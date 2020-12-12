<template>
  <transition name="shake">
    <div
      v-if="errors.length"
      class="bg-red-200 dark:bg-red-500 dark:text-gray-50 p-2 mb-6 rounded-lg font-semibold shake"
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

<style>
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.shake-enter-active,
.shake-leave-active {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}
.shake-enter,
.shake-leave-to {
  opacity: 0;
}
</style>
