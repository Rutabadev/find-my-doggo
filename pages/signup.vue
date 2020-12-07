<template>
  <div
    class="max-w-sm mt-10 mx-auto rounded-lg bg-white shadow-md p-5 flex flex-col"
  >
    <h1 class="text-2xl text-center mb-6">Sign up</h1>
    <form class="flex flex-col" action="">
      <div class="field">
        <input type="text" name="username" placeholder=" " />
        <label for="username">Username</label>
      </div>
      <div class="field">
        <input type="email" name="email" placeholder=" " required />
        <label for="email">Email</label>
      </div>
      <div class="field">
        <input type="password" name="password" placeholder=" " required />
        <label for="password">Password</label>
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
