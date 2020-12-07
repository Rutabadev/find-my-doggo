<template>
  <div
    class="max-w-sm mt-10 mx-auto rounded-lg bg-white shadow-md p-5 flex flex-col"
  >
    <h1 class="text-2xl text-center mb-6">Sign up</h1>
    <transition name="fade">
      <div
        v-if="errors.length"
        class="bg-red-200 p-2 mb-6 rounded-lg font-semibold"
      >
        <ul v-for="error in errors" :key="error">
          <li>{{ error.message || error }}</li>
        </ul>
      </div>
    </transition>
    <form class="flex flex-col" @submit.prevent="signup">
      <div class="field">
        <input
          v-model="signupInfo.name"
          type="text"
          name="username"
          placeholder=" "
        />
        <label for="username"
          >Username <span class="text-red-500">*</span></label
        >
      </div>
      <div class="field">
        <input
          v-model="signupInfo.email"
          type="email"
          name="email"
          placeholder=" "
        />
        <label for="email">Email</label>
      </div>
      <div class="field">
        <input
          v-model="signupInfo.password"
          type="password"
          name="password"
          placeholder=" "
        />
        <label for="password"
          >Password <span class="text-red-500">*</span></label
        >
      </div>
      <button class="button my-2 uppercase">Sign up</button>
    </form>
    <p class="ml-auto mt-5">
      Already have an account yet ? Go to
      <NuxtLink to="/login" class="text-blue-600 hover:underline mt-5"
        >login</NuxtLink
      >
    </p>
  </div>
</template>

<script>
export default {
  auth: false,
  transition(to) {
    if (to.name === 'login') {
      return 'slide-right'
    }
  },

  data() {
    return {
      signupInfo: {
        name: '',
        email: '',
        password: '',
      },
      errors: [],
    }
  },

  methods: {
    signup() {
      this.$axios
        .$post('/users', this.signupInfo)
        .then(() => {
          this.$router.push('/login')
        })
        .catch((err) => {
          this.errors = err?.response?.data?.errors?.map(
            ({ message }) => message
          ) ?? [err?.response?.data] ?? [err.message]
        })
    },
  },
}
</script>

<style>
input[type='email']:valid {
  @apply text-green-600;
}

input[type='email']:not(:placeholder-shown):invalid {
  @apply text-red-500;
}
</style>
