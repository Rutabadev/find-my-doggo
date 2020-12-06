<template>
  <div
    class="max-w-sm mt-10 mx-auto rounded-lg bg-white shadow-md p-5 flex flex-col"
  >
    <h1 class="text-2xl text-center mb-6">Sign up</h1>
    <form class="flex flex-col" action="">
      <label for="username">Username</label>
      <input type="text" ame="username" placeholder="AlphonseBrown37" n />
      <label for="email">Email</label>
      <input
        type="email"
        name="email"
        placeholder="alphonse.brown37@gmail.com"
        required
      />
      <label for="password">Password</label>
      <input
        type="password"
        name="password"
        placeholder="Qu3lqUeCh0sedEloNg"
        required
      />
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

<style></style>
