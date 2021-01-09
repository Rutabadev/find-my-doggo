<template>
  <div class="field mt-4 mb-6">
    <div class="relative">
      <!--suppress HtmlFormInputWithoutLabel -->
      <input
        v-model="inputVal"
        :name="name"
        class="block w-full shadow-inner"
        :type="type"
        :autocomplete="autocomplete"
        placeholder=" "
      />
      <label
        class="absolute inset-0 p-2 border-2 border-transparent text-gray-400 pointer-events-none duration-200 truncate"
        :for="name"
        >{{ label }}
        <span v-if="required" class="text-red-500 dark:text-red-400"
          >*</span
        ></label
      >
    </div>
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
    autocomplete: {
      type: String,
      default: '',
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

<style lang="scss" scoped>
.field {
  input:focus ~ label,
  input:not(:placeholder-shown) ~ label {
    @apply p-0;
    @apply border-none;
    @apply transform;
    @apply origin-left;
    @apply scale-90;
    @apply -translate-y-7;
  }

  input[type='email'] {
    &:valid {
      @apply text-green-600;
    }

    &:not(:placeholder-shown):invalid {
      @apply text-red-500;
    }

    .dark & {
      &:valid {
        @apply text-green-400;
      }

      &:not(:placeholder-shown):invalid {
        @apply text-red-400;
      }
    }
  }
}
</style>
