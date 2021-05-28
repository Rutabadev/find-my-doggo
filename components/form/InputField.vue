<template>
  <div class="field">
    <div class="relative">
      <!--suppress HtmlFormInputWithoutLabel -->
      <input
        :id="name"
        v-model="inputVal"
        class="
          block
          border-2 border-gray-300
          w-full
          shadow-inner
          focus:outline-none
          focus:ring-2 focus:ring-primary-400
          focus:border-primary-600;
          rounded
          p-2
          dark:bg-gray-600
          dark:border-gray-800
          dark:focus:border-primary-500
        "
        :type="type"
        :autocomplete="autocomplete"
        placeholder=" "
      />
      <label
        class="
          absolute
          inset-0
          p-2
          border-2 border-transparent
          text-gray-400
          pointer-events-none
          duration-200
          truncate
        "
        :for="name"
        >{{ label }}
        <span v-if="required" class="text-red-500 dark:text-red-400">*</span>
      </label>
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
      type: Array as PropType<string[]>,
      default() {
        return []
      },
    },
  },

  computed: {
    fieldErrors(): string[] {
      return this.errors?.filter((message) => message.includes(this.name))
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

<style scoped>
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
