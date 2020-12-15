<template>
  <div class="field">
    <input v-model="inputVal" :type="type" placeholder=" " />
    <label :for="name"
      >{{ label }}
      <span v-if="required" class="text-red-500 dark:text-red-400"
        >*</span
      ></label
    >
    <transition-group name="shake">
      <div v-for="(errorMessage, index) in fieldErrors" :key="errorMessage">
        <span class="text-red-500 dark:text-red-400">{{ errorMessage }}</span>
        <br v-if="fieldErrors.length && index !== fieldErrors.length - 1" />
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { FormError } from '~/types'

export default Vue.extend({
  props: {
    label: {
      type: String,
      required: true,
      default: '',
    },
    name: {
      type: String,
      required: true,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Array as PropType<FormError[]>,
      default() {
        return []
      },
    },
  },

  computed: {
    fieldErrors(): string[] {
      return (
        this.errors
          ?.filter(({ field }) => field === this.name)
          ?.map(({ message }) => message) || []
      )
    },
    inputVal: {
      get(): string {
        return this.value
      },
      set(val: string) {
        this.$emit('input', val)
      },
    },
  },
})
</script>

<style lang="scss">
.field {
  @apply relative;
  @apply mt-4;
  @apply mb-6;

  input {
    @apply block;
    @apply w-full;
  }

  label {
    @apply absolute;
    top: 2px;
    @apply p-2;
    @apply text-gray-400;
    @apply pointer-events-none;
    @apply duration-200;
  }

  input:focus-within ~ label,
  input:not(:placeholder-shown) ~ label {
    @apply top-0;
    @apply -left-1;
    @apply p-0;
    @apply transform;
    @apply scale-90;
    @apply -translate-y-6;
  }
}
</style>
